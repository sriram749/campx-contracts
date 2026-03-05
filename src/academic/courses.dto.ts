import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ type: String, required: true, description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true, description: 'code' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ type: String, required: false, description: 'description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: true, description: 'level', enum: CourseLevel })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(CourseLevel))
  level: string;

  @ApiProperty({ type: Number, required: true, description: 'durationYears', minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  durationYears: number;

  @ApiProperty({ type: Number, required: false, description: 'totalCredits', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalCredits?: number;

  @ApiProperty({ type: Boolean, required: false, description: 'isActive' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateCourseDto {
  @ApiProperty({ type: String, required: false, description: 'name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: String, required: false, description: 'description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: false, description: 'level', enum: CourseLevel })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(CourseLevel))
  level?: string;

  @ApiProperty({ type: Number, required: false, description: 'durationYears', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  durationYears?: number;

  @ApiProperty({ type: Number, required: false, description: 'totalCredits', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalCredits?: number;

  @ApiProperty({ type: Boolean, required: false, description: 'isActive' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class GetCoursesDto {
  @ApiProperty({ type: String, required: false, description: 'level' })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiProperty({ type: String, required: false, description: 'search' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ type: Boolean, required: false, description: 'isActive' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ type: Number, required: false, description: 'limit' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({ type: Number, required: false, description: 'skip' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip?: number;
}
