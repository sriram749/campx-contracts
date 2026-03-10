import { Transform, Type } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

const LEARNING_VIDEO_STATUS = ['DRAFT', 'PUBLISHED', 'ARCHIVED'] as const;
type LearningVideoStatus = (typeof LEARNING_VIDEO_STATUS)[number];

export class LearningVideoCreateDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  subjectId: number;

  @IsNotEmpty()
  @IsString()
  entryId: string;
}

export class LearningVideoUpdateDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  kalturaEntryId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  duration?: number;

  @IsOptional()
  @IsIn(LEARNING_VIDEO_STATUS)
  status?: LearningVideoStatus;
}

export class GetLearningVideosDto {
  @IsOptional()
  @IsIn(LEARNING_VIDEO_STATUS)
  status?: LearningVideoStatus;
}

export class UpdateVideoStatusDto {
  @IsNotEmpty()
  @IsIn(LEARNING_VIDEO_STATUS)
  status: LearningVideoStatus;
}
