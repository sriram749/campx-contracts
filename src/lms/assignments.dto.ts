import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, IsArray, IsIn, IsDate, Min } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export enum AssignmentStatus {
  Draft = 'draft',
  Published = 'published',
  Closed = 'closed',
}

export enum SubmissionType {
  File = 'file',
  Text = 'text',
  Link = 'link',
}

export class CreateAssignmentDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(SubmissionType))
  submissionType: string;

  @IsNotEmpty()
  @IsBoolean()
  hasGrading: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxMarks?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  submissionEndDate?: Date;
}

export class UpdateAssignmentDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(SubmissionType))
  submissionType?: string;

  @IsOptional()
  @IsBoolean()
  hasGrading?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  maxMarks?: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  submissionEndDate?: Date;
}

export class GetAssignmentsDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  classroomId: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  subjectId?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip?: number;
}
