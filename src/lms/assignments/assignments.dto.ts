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
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  instructions?: string;

  @IsOptional()
  @IsString()
  prerequisiteAssignmentId?: string;

  @IsOptional()
  @IsBoolean()
  updateRegistrations?: boolean;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(SubmissionTypes))
  submissionType: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  submissionFileType?: string;

  @IsNotEmpty()
  @IsBoolean()
  hasTimeLimit: boolean;

  @ValidateIf((o) => o.hasTimeLimit)
  @IsDate()
  submissionStartDate?: Date;

  @ValidateIf((o) => o.hasTimeLimit)
  @IsDate()
  submissionEndDate?: Date;

  @IsNotEmpty()
  @IsBoolean()
  hasGrading: boolean;

  @ValidateIf((o) => o.hasGrading)
  @IsNumber()
  @Min(0)
  maxMarks?: number;

  @ValidateIf((o) => o.hasGrading)
  @IsNumber()
  @Min(0)
  passMarks?: number;

  @IsNotEmpty()
  @IsBoolean()
  hasSubmissionLimit: boolean;

  @ValidateIf((o) => o.hasSubmissionLimit)
  @IsNumber()
  @Min(0)
  maxSubmissions?: number;

  @IsOptional()
  @IsString()
  fileKey?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  subjectIds?: number[];

  @IsOptional()
  @IsString()
  assessmentTypeName?: string;

  @IsOptional()
  @IsNumber()
  assessmentNumber?: number;

  @IsOptional()
  @IsNumber()
  assessmentTemplateId?: number;
}

export class AssignmentCreateDto extends AssignmentUpdateDto {
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(AssignmentTypes))
  assignmentType?: string;

  @ValidateIf((o) => o.assignmentType !== AssignmentTypes.Integrated)
  @IsNotEmpty()
  @IsNumber()
  subjectId?: number;

  @ValidateIf((o) => o.assignmentType === AssignmentTypes.Integrated)
  @IsArray()
  @ArrayNotEmpty({ message: 'At least one subject must be selected for integrated assignments' })
  @IsNumber({}, { each: true })
  subjectIds?: number[];

  @ValidateIf((o) => o.assignmentType === AssignmentTypes.Integrated)
  @IsNotEmpty()
  @IsString()
  assessmentTypeName?: string;

  @ValidateIf((o) => o.assignmentType === AssignmentTypes.Integrated)
  @IsNotEmpty()
  @IsNumber()
  assessmentNumber?: number;
}

export class AddAssignmentStudentsDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  studentIds: number[];
}

export class UpdateAssignmentStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(AssignmentStatus))
  status: string;
}

export class AssignmentStudentMarksDto {
  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  marks?: number;

  @IsOptional()
  @IsString()
  facultyComments?: string;
}

export class AssignmentStudentsMarksUpdateDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssignmentStudentMarksDto)
  students: AssignmentStudentMarksDto[];
}

export class GetAssignmentsDto {
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @IsOptional()
  @IsNumber()
  subjectId?: number;

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
