import { IsBatch } from '@campxdev/server-shared';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class SubjectObeOutcomePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @Transform(({ value }) => value?.trim()?.toUpperCase())
  code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  descList: string[];
}

export class SubjectObeMappingDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @Transform(({ value }) => value?.trim()?.toUpperCase())
  mapValue1Code: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @Transform(({ value }) => value?.trim()?.toUpperCase())
  mapValue2Code: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  value: number;
}

export class SubjectObeOutcomesPostDto {
  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsNotEmpty()
  @IsString()
  @IsBatch()
  batch: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectObeOutcomePostDto)
  outcomes: SubjectObeOutcomePostDto[];
}

export class SubjectObePoAndCoMappingPostDto {
  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsNotEmpty()
  @IsString()
  @IsBatch()
  batch: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectObeMappingDto)
  poAndCoMapping: SubjectObeMappingDto[];
}

export class SubjectObeGetOneDto {
  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsNotEmpty()
  @IsString()
  @IsBatch()
  batch: string;
}

export class GetSubjectsForObeDto {
  @IsNotEmpty()
  @IsString()
  @IsBatch()
  batch: string;

  @IsOptional()
  @IsNumber()
  courseId?: number;

  @IsOptional()
  @IsString()
  branchCode?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  semNo?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}
