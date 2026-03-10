import { Transform, Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

const LEARNING_EBOOK_STATUS = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;
type LearningEbookStatus = (typeof LEARNING_EBOOK_STATUS)[number];

export class LearningEbookCreateDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  subjectId: number;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  fileData?: any;

  @IsOptional()
  coverImageData?: any;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  totalPages?: number;

  @IsOptional()
  @IsIn(LEARNING_EBOOK_STATUS)
  status?: LearningEbookStatus;
}

export class LearningEbookUpdateDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  fileData?: any;

  @IsOptional()
  coverImageData?: any;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  totalPages?: number;

  @IsOptional()
  @IsIn(LEARNING_EBOOK_STATUS)
  status?: LearningEbookStatus;
}

export class GetLearningEbooksDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsIn(LEARNING_EBOOK_STATUS)
  status?: LearningEbookStatus;
}

export class GetEbooksByAuthorDto {
  @IsString()
  author: string;
}

export class GetEbooksByStatusDto {
  @IsIn(LEARNING_EBOOK_STATUS)
  status: LearningEbookStatus;
}
