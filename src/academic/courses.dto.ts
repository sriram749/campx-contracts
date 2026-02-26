import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum CourseLevel {
  Undergraduate = 'undergraduate',
  Postgraduate = 'postgraduate',
  Diploma = 'diploma',
  Certificate = 'certificate',
}

export enum CourseStatus {
  Active = 'active',
  Inactive = 'inactive',
  Archived = 'archived',
}

export class CreateCourseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(CourseLevel))
  level: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  durationYears: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalCredits?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateCourseDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(CourseLevel))
  level?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  durationYears?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalCredits?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class GetCoursesDto {
  @IsOptional()
  @IsString()
  level?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip?: number;
}
