import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum AssignmentStatus {
  Draft = 'draft',
  Published = 'published',
  Closed = 'closed',
}

export enum AssignmentTypes {
  Individual = 'individual',
  Integrated = 'integrated',
}

export enum SubmissionTypes {
  File = 'file',
  Text = 'text',
  Link = 'link',
}

export class AssignmentUpdateDto {
  @ApiProperty({ type: String, required: true, description: 'title' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @ApiProperty({ type: String, required: false, description: 'description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: false, description: 'instructions' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiProperty({ type: String, required: false, description: 'prerequisiteAssignmentId' })
  @IsOptional()
  @IsString()
  prerequisiteAssignmentId?: string;

  @ApiProperty({ type: Boolean, required: false, description: 'updateRegistrations' })
  @IsOptional()
  @IsBoolean()
  updateRegistrations?: boolean;

  @ApiProperty({ type: String, required: true, description: 'submissionType', enum: SubmissionTypes })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(SubmissionTypes))
  submissionType: string;

  @ApiProperty({ type: String, required: false, description: 'submissionFileType' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  submissionFileType?: string;

  @ApiProperty({ type: Boolean, required: true, description: 'hasTimeLimit' })
  @IsNotEmpty()
  @IsBoolean()
  hasTimeLimit: boolean;

  @ApiProperty({ type: Date, required: false, description: 'submissionStartDate' })
  @ValidateIf((o) => o.hasTimeLimit)
  @IsDate()
  submissionStartDate?: Date;

  @ApiProperty({ type: Date, required: false, description: 'submissionEndDate' })
  @ValidateIf((o) => o.hasTimeLimit)
  @IsDate()
  submissionEndDate?: Date;

  @ApiProperty({ type: Boolean, required: true, description: 'hasGrading' })
  @IsNotEmpty()
  @IsBoolean()
  hasGrading: boolean;

  @ApiProperty({ type: Number, required: false, description: 'maxMarks', minimum: 0 })
  @ValidateIf((o) => o.hasGrading)
  @IsNumber()
  @Min(0)
  maxMarks?: number;

  @ApiProperty({ type: Number, required: false, description: 'passMarks', minimum: 0 })
  @ValidateIf((o) => o.hasGrading)
  @IsNumber()
  @Min(0)
  passMarks?: number;

  @ApiProperty({ type: Boolean, required: true, description: 'hasSubmissionLimit' })
  @IsNotEmpty()
  @IsBoolean()
  hasSubmissionLimit: boolean;

  @ApiProperty({ type: Number, required: false, description: 'maxSubmissions', minimum: 0 })
  @ValidateIf((o) => o.hasSubmissionLimit)
  @IsNumber()
  @Min(0)
  maxSubmissions?: number;

  @ApiProperty({ type: String, required: false, description: 'fileKey' })
  @IsOptional()
  @IsString()
  fileKey?: string;

  @ApiProperty({ type: [Number], required: false, description: 'subjectIds' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  subjectIds?: number[];

  @ApiProperty({ type: String, required: false, description: 'assessmentTypeName' })
  @IsOptional()
  @IsString()
  assessmentTypeName?: string;

  @ApiProperty({ type: Number, required: false, description: 'assessmentNumber' })
  @IsOptional()
  @IsNumber()
  assessmentNumber?: number;

  @ApiProperty({ type: Number, required: false, description: 'assessmentTemplateId' })
  @IsOptional()
  @IsNumber()
  assessmentTemplateId?: number;
}

export class AssignmentCreateDto extends AssignmentUpdateDto {
  @ApiProperty({ type: Number, required: true, description: 'classroomId' })
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @ApiProperty({ type: String, required: false, description: 'assignmentType', enum: AssignmentTypes })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(AssignmentTypes))
  assignmentType?: string;

  @ApiProperty({ type: Number, required: false, description: 'subjectId' })
  @ValidateIf((o) => o.assignmentType !== AssignmentTypes.Integrated)
  @IsNotEmpty()
  @IsNumber()
  subjectId?: number;

  @ApiProperty({ type: [Number], required: false, description: 'subjectIds' })
  @ValidateIf((o) => o.assignmentType === AssignmentTypes.Integrated)
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one subject must be selected for integrated assignments' })
  @IsNumber({}, { each: true })
  subjectIds?: number[];

  @ApiProperty({ type: String, required: false, description: 'assessmentTypeName' })
  @ValidateIf((o) => o.assignmentType === AssignmentTypes.Integrated)
  @IsNotEmpty()
  @IsString()
  assessmentTypeName?: string;

  @ApiProperty({ type: Number, required: false, description: 'assessmentNumber' })
  @ValidateIf((o) => o.assignmentType === AssignmentTypes.Integrated)
  @IsNotEmpty()
  @IsNumber()
  assessmentNumber?: number;
}

export class AddAssignmentStudentsDto {
  @ApiProperty({ type: [Number], required: true, description: 'studentIds' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  studentIds: number[];
}

export class UpdateAssignmentStatusDto {
  @ApiProperty({ type: String, required: true, description: 'status', enum: AssignmentStatus })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(AssignmentStatus))
  status: string;
}

export class AssignmentStudentMarksDto {
  @ApiProperty({ type: Number, required: true, description: 'studentId' })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({ type: Number, required: false, description: 'marks', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  marks?: number;

  @ApiProperty({ type: String, required: false, description: 'facultyComments' })
  @IsOptional()
  @IsString()
  facultyComments?: string;
}

export class AssignmentStudentsMarksUpdateDto {
  @ApiProperty({ type: [AssignmentStudentMarksDto], required: true, description: 'students' })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignmentStudentMarksDto)
  students: AssignmentStudentMarksDto[];
}

export class GetAssignmentsDto {
  @ApiProperty({ type: Number, required: true, description: 'classroomId' })
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @ApiProperty({ type: Number, required: false, description: 'subjectId' })
  @IsOptional()
  @IsNumber()
  subjectId?: number;

  @ApiProperty({ type: String, required: false, description: 'assignmentType', enum: AssignmentTypes })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(AssignmentTypes))
  assignmentType?: string;

  @ApiProperty({ type: Number, required: false, description: 'limit', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({ type: Number, required: false, description: 'skip', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;

  @ApiProperty({ type: String, required: false, description: 'search' })
  @IsOptional()
  @IsString()
  search: string;
}

export class GetStudentAssignmentsDto {
  @ApiProperty({ type: Number, required: false, description: 'subjectId' })
  @IsOptional()
  @IsNumber()
  subjectId: number;

  @ApiProperty({ type: String, required: false, description: 'assignmentType', enum: AssignmentTypes })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(AssignmentTypes))
  assignmentType?: string;

  @ApiProperty({ type: Number, required: false, description: 'limit', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({ type: Number, required: false, description: 'skip', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}
