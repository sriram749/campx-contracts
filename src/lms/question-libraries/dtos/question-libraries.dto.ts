import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class QuestionLibraryCreateDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  courseCode: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  subjectName?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  batch?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  regulation?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  program?: string;
}

export class QuestionLibraryUpdateDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  courseCode: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  subjectName?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  batch?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  regulation?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  program?: string;
}

export class SubjectQuestionLibraryGetDto {
  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}

export class CreateMultipleSubjectQuestionLibraryDto {
  @IsNotEmpty()
  @IsArray()
  questionLibraryIds: string[];

  @IsNotEmpty()
  @IsNumber()
  subjectId: number;
}

export class AllQuestionLibrariesGetDto {
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
  @Transform(({ value }) => value?.trim())
  search?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  courseCode?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  batch?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  regulation?: string;

  @IsOptional()
  @IsString()
  createdById?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  program?: string;
}
