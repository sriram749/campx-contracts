import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, IsArray, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum QuizStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
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
  @IsNumber()
  @Min(1)
  durationMinutes: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalMarks?: number;
}

export class UpdateQuizDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  durationMinutes?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalMarks?: number;
}

export class GetQuizzesDto {
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
