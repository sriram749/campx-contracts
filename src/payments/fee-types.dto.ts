import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum FeeCategory {
  Tuition = 'tuition',
  Exam = 'exam',
  Hostel = 'hostel',
  Transport = 'transport',
  Library = 'library',
  Other = 'other',
}

export class CreateFeeTypeDto {
  @ApiProperty({ type: String, required: true, description: 'Display name for this fee type' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: false, description: 'Optional description of what this fee covers' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: true, description: 'Category this fee belongs to', enum: FeeCategory })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(FeeCategory))
  category: string;

  @ApiProperty({ type: Number, required: true, description: 'Default monetary amount for this fee type', minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  defaultAmount: number;

  @ApiProperty({ type: Boolean, required: false, description: 'Whether this fee is refundable to students' })
  @IsOptional()
  @IsBoolean()
  isRefundable?: boolean;
}

export class UpdateFeeTypeDto {
  @ApiProperty({ type: String, required: false, description: 'Updated display name for this fee type' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: String, required: false, description: 'Updated description of what this fee covers' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: false, description: 'Updated fee category', enum: FeeCategory })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(FeeCategory))
  category?: string;

  @ApiProperty({ type: Number, required: false, description: 'Updated default monetary amount', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  defaultAmount?: number;

  @ApiProperty({ type: Boolean, required: false, description: 'Whether this fee is refundable' })
  @IsOptional()
  @IsBoolean()
  isRefundable?: boolean;
}

export class GetFeeTypesDto {
  @ApiProperty({ type: String, required: false, description: 'Filter by fee category', enum: FeeCategory })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ type: String, required: false, description: 'Search term to filter fee types by name' })
  @IsOptional()
  @IsString()
  search?: string;

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
