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
  @ApiProperty({ type: String, required: true, description: 'Full name of the course' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: true, description: 'Unique course code (e.g. CS101)' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({ type: String, required: false, description: 'Brief description of the course' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: true, description: 'Academic level of the course', enum: CourseLevel })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(CourseLevel))
  level: string;

  @ApiProperty({ type: Number, required: true, description: 'Duration of the course in years', minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  durationYears: number;

  @ApiProperty({ type: Number, required: false, description: 'Total credit hours for the course', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalCredits?: number;

  @ApiProperty({ type: Boolean, required: false, description: 'Whether the course is currently active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateCourseDto {
  @ApiProperty({ type: String, required: false, description: 'Updated name of the course' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: String, required: false, description: 'Updated description of the course' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: false, description: 'Updated academic level', enum: CourseLevel })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(CourseLevel))
  level?: string;

  @ApiProperty({ type: Number, required: false, description: 'Updated duration in years', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  durationYears?: number;

  @ApiProperty({ type: Number, required: false, description: 'Updated total credit hours', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalCredits?: number;

  @ApiProperty({ type: Boolean, required: false, description: 'Whether the course is currently active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class GetCoursesDto {
  @ApiProperty({ type: String, required: false, description: 'Filter by academic level' })
  @IsOptional()
  @IsString()
  level?: string;

  @ApiProperty({ type: String, required: false, description: 'Search term to filter courses by name or code' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ type: Boolean, required: false, description: 'Filter by active status' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ type: Number, required: false, description: 'Maximum number of results to return' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({ type: Number, required: false, description: 'Number of results to skip for pagination' })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip?: number;
}
