import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, IsIn, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum FeeCategory {
  Tuition = 'tuition',
  Exam = 'exam',
  Hostel = 'hostel',
  Transport = 'transport',
  Library = 'library',
  Other = 'other',
}

export class CreateFeeTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(FeeCategory))
  category: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  defaultAmount: number;

  @IsOptional()
  @IsBoolean()
  isRefundable?: boolean;
}

export class UpdateFeeTypeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(FeeCategory))
  category?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  defaultAmount?: number;

  @IsOptional()
  @IsBoolean()
  isRefundable?: boolean;
}

export class GetFeeTypesDto {
  @IsOptional()
  @IsString()
  category?: string;

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
