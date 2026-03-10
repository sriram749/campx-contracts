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

export class DbValuePropsDto {
  column: string;
}

export class DbLabelPropsDto {
  columns: string[];
  separator?: string;
}

export class AssignmentUpdateDto {
  @ApiProperty({ type: String, required: true, description: 'Title of the assignment' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @ApiProperty({ type: String, required: false, description: 'Description of the assignment' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: false, description: 'Submission instructions for students' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiProperty({ type: String, required: false, description: 'ID of a prerequisite assignment to complete first' })
  @IsOptional()
  @IsString()
  prerequisiteAssignmentId?: string;

  @ApiProperty({ type: Boolean, required: false, description: 'Whether to update already-registered student records' })
  @IsOptional()
  @IsBoolean()
  updateRegistrations?: boolean;

  @ApiProperty({ type: String, required: true, description: 'Submission type accepted for this assignment', enum: SubmissionTypes })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(SubmissionTypes))
  submissionType: string;

  @ApiProperty({ type: String, required: false, description: 'Accepted file type for file submissions (e.g. pdf, docx)' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  submissionFileType?: string;

  @ApiProperty({ type: Boolean, required: true, description: 'Whether the assignment has a submission time window' })
  @IsNotEmpty()
  @IsBoolean()
  hasTimeLimit: boolean;

  @ApiProperty({ type: String, format: 'date-time', required: false, description: 'Start of the submission window' })
  @ValidateIf((o) => o.hasTimeLimit)
  @IsDate()
  submissionStartDate?: Date;

  @ApiProperty({ type: String, format: 'date-time', required: false, description: 'End of the submission window' })
  @ValidateIf((o) => o.hasTimeLimit)
  @IsDate()
  submissionEndDate?: Date;

  @ApiProperty({ type: Boolean, required: true, description: 'Whether the assignment is graded' })
  @IsNotEmpty()
  @IsBoolean()
  hasGrading: boolean;

  @ApiProperty({ type: Number, required: false, description: 'Maximum marks attainable for this assignment', minimum: 0 })
  @ValidateIf((o) => o.hasGrading)
  @IsNumber()
  @Min(0)
  maxMarks?: number;

  @ApiProperty({ type: Number, required: false, description: 'Minimum marks required to pass', minimum: 0 })
  @ValidateIf((o) => o.hasGrading)
  @IsNumber()
  @Min(0)
  passMarks?: number;

  @ApiProperty({ type: Boolean, required: true, description: 'Whether the number of submissions is limited' })
  @IsNotEmpty()
  @IsBoolean()
  hasSubmissionLimit: boolean;

  @ApiProperty({ type: Number, required: false, description: 'Maximum number of submissions allowed per student', minimum: 0 })
  @ValidateIf((o) => o.hasSubmissionLimit)
  @IsNumber()
  @Min(0)
  maxSubmissions?: number;

  @ApiProperty({ type: String, required: false, description: 'Storage key for an attached resource file' })
  @IsOptional()
  @IsString()
  fileKey?: string;

  @ApiProperty({ type: [Number], required: false, description: 'List of subject IDs linked to this assignment' })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  subjectIds?: number[];

  @ApiProperty({ type: String, required: false, description: 'Assessment type name for marks sync' })
  @IsOptional()
  @IsString()
  assessmentTypeName?: string;

  @ApiProperty({ type: Number, required: false, description: 'Assessment number for marks sync' })
  @IsOptional()
  @IsNumber()
  assessmentNumber?: number;

  @ApiProperty({ type: Number, required: false, description: 'ID of the assessment template' })
  @IsOptional()
  @IsNumber()
  assessmentTemplateId?: number;
}

export class AssignmentCreateDto extends AssignmentUpdateDto {
  @ApiProperty({ type: Number, required: true, description: 'ID of the classroom this assignment belongs to' })
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @ApiProperty({ type: String, required: false, description: 'Type of assignment', enum: AssignmentTypes })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(AssignmentTypes))
  assignmentType?: string;

  @ApiProperty({ type: Number, required: false, description: 'ID of the subject for individual assignments' })
  @ValidateIf((o) => o.assignmentType !== AssignmentTypes.Integrated)
  @IsNotEmpty()
  @IsNumber()
  subjectId?: number;

  @ApiProperty({ type: [Number], required: false, description: 'List of subject IDs for integrated assignments' })
  @ValidateIf((o) => o.assignmentType === AssignmentTypes.Integrated)
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one subject must be selected for integrated assignments' })
  @IsNumber({}, { each: true })
  subjectIds?: number[];

  @ApiProperty({ type: String, required: false, description: 'Assessment type name (required for integrated assignments)' })
  @ValidateIf((o) => o.assignmentType === AssignmentTypes.Integrated)
  @IsNotEmpty()
  @IsString()
  assessmentTypeName?: string;

  @ApiProperty({ type: Number, required: false, description: 'Assessment number (required for integrated assignments)' })
  @ValidateIf((o) => o.assignmentType === AssignmentTypes.Integrated)
  @IsNotEmpty()
  @IsNumber()
  assessmentNumber?: number;
}

export class AddAssignmentStudentsDto {
  @ApiProperty({ type: [Number], required: true, description: 'List of student IDs to add or remove from the assignment' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  studentIds: number[];
}

export class UpdateAssignmentStatusDto {
  @ApiProperty({ type: String, required: true, description: 'New status for the assignment', enum: AssignmentStatus })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(AssignmentStatus))
  status: string;
}

export class AssignmentStudentMarksDto {
  @ApiProperty({ type: Number, required: true, description: 'ID of the student whose marks are being updated' })
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @ApiProperty({ type: Number, required: false, description: 'Marks awarded to the student', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  marks?: number;

  @ApiProperty({ type: String, required: false, description: 'Faculty comments or feedback for the student' })
  @IsOptional()
  @IsString()
  facultyComments?: string;
}

export class AssignmentStudentsMarksUpdateDto {
  @ApiProperty({ type: [AssignmentStudentMarksDto], required: true, description: 'List of student marks to update' })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignmentStudentMarksDto)
  students: AssignmentStudentMarksDto[];
}

export class GetAssignmentsDto {
  @ApiProperty({ type: Number, required: true, description: 'ID of the classroom to fetch assignments for' })
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @ApiProperty({ type: Number, required: false, description: 'Filter by subject ID' })
  @IsOptional()
  @IsNumber()
  subjectId?: number;

  @ApiProperty({ type: String, required: false, description: 'Filter by assignment type', enum: AssignmentTypes })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(AssignmentTypes))
  assignmentType?: string;

  @ApiProperty({ type: Number, required: false, description: 'Maximum number of results to return', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({ type: Number, required: false, description: 'Number of results to skip for pagination', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;

  @ApiProperty({ type: String, required: false, description: 'Search term to filter assignments by title' })
  @IsOptional()
  @IsString()
  search: string;
}

export class GetStudentAssignmentsDto {
  @IsOptional()
  @IsNumber()
  subjectId: number;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(AssignmentTypes))
  assignmentType?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}

export class GetAssignmentsDropdownDto {
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @IsOptional()
  @IsNumber()
  subjectId?: number;

  @IsOptional()
  @IsString()
  nId: string;

  @IsNotEmpty()
  dbValueProps: DbValuePropsDto;

  @IsNotEmpty()
  dbLabelProps: DbLabelPropsDto;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;
}
