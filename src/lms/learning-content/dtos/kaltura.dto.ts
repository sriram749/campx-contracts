import { Transform, Type } from 'class-transformer';
import { IsDateString, IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class KalturaVideoFiltersDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  search?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minDuration?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxDuration?: number;

  @IsOptional()
  @IsDateString()
  createdAfter?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  offset?: number;
}

export class AddKalturaVideoDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  subjectId: number;

  @IsString()
  @Transform(({ value }) => value?.trim())
  kalturaEntryId: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsIn(['DRAFT', 'PUBLISHED', 'ARCHIVED'])
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export class SyncKalturaVideoDto {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  id: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  kalturaEntryId?: string;
}

export class KalturaVideoResponseDto {
  id: string;
  name: string;
  description: string;
  duration: number;
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  categories: string[];
  metadata: any;
}

export class KalturaConnectionTestDto {
  success: boolean;
  message: string;
  timestamp: Date;
}
