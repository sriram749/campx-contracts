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

export class ProgramObeOutcomeDto {
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
  @MinLength(1)
  @MaxLength(512)
  @Transform(({ value }) => value?.trim())
  description: string;
}

export class ProgramObeMappingDto {
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

export class ProgramObePostDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsNumber()
  programId: number;

  @IsNotEmpty()
  @IsString()
  @IsBatch()
  batch: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgramObeOutcomeDto)
  outcomes: ProgramObeOutcomeDto[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgramObeOutcomeDto)
  educationalObjectives: ProgramObeOutcomeDto[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgramObeOutcomeDto)
  specificObjectives: ProgramObeOutcomeDto[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgramObeMappingDto)
  poAndPeoMapping: ProgramObeMappingDto[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProgramObeMappingDto)
  poAndPsoMapping: ProgramObeMappingDto[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  directProgramAttainmentWeightage?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  inDirectProgramAttainmentWeightage?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  directCourseAttainmentWeightage?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  inDirectCourseAttainmentWeightage?: number;
}

export class ProgramObeGetOneDto {
  @IsNotEmpty()
  @IsNumber()
  programId: number;

  @IsNotEmpty()
  @IsString()
  @IsBatch()
  batch: string;
}
