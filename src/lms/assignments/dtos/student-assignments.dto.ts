import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class StudentAssignmentFileUploadDto {
  @IsNotEmpty()
  @IsString()
  assignmentId: string;
}
export class StudentAssignmentResponsePostDto {
  @IsNotEmpty()
  @IsString()
  assignmentId: string;

  @IsOptional()
  @IsNumber()
  studentId?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  content?: string;

  @IsOptional()
  @IsString()
  fileKey?: string;

  @IsNotEmpty()
  @IsBoolean()
  isSubmitted: boolean;
}

export class StudentAssignmentDeleteSubmissionDto {
  @IsNotEmpty()
  @IsString()
  assignmentId: string;

  @IsOptional()
  @IsNumber()
  studentId?: number;
}

export class ExtendSubmissionDto {
  @IsNotEmpty()
  @IsString()
  assignmentId: string;

  @IsNotEmpty()
  @IsNumber()
  studentId: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  newSubmissionEndDate?: Date;

  @IsOptional()
  @IsNumber()
  @Min(0)
  additionalSubmissions?: number;
}
