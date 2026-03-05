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
  @ApiProperty({ type: String, required: true, description: 'name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ type: String, required: false, description: 'description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: true, description: 'category', enum: FeeCategory })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(FeeCategory))
  category: string;

  @ApiProperty({ type: Number, required: true, description: 'defaultAmount', minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  defaultAmount: number;

  @ApiProperty({ type: Boolean, required: false, description: 'isRefundable' })
  @IsOptional()
  @IsBoolean()
  isRefundable?: boolean;
}

export class UpdateFeeTypeDto {
  @ApiProperty({ type: String, required: false, description: 'name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ type: String, required: false, description: 'description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: String, required: false, description: 'category', enum: FeeCategory })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(FeeCategory))
  category?: string;

  @ApiProperty({ type: Number, required: false, description: 'defaultAmount', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  defaultAmount?: number;

  @ApiProperty({ type: Boolean, required: false, description: 'isRefundable' })
  @IsOptional()
  @IsBoolean()
  isRefundable?: boolean;
}

export class GetFeeTypesDto {
  @ApiProperty({ type: String, required: false, description: 'category' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({ type: String, required: false, description: 'search' })
  @IsOptional()
  @IsString()
  search?: string;

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
