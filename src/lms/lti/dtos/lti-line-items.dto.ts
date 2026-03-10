import { Type } from 'class-transformer';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateLineItemDto {
  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsNotEmpty()
  @IsString()
  deploymentId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  scoreMaximum: number;

  @IsNotEmpty()
  @IsString()
  label: string;

  @IsNotEmpty()
  @IsString()
  resourceLinkId: string;

  @IsOptional()
  @IsString()
  resourceId?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  startDateTime?: string;

  @IsOptional()
  @IsString()
  endDateTime?: string;
}

export class UpdateLineItemDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  scoreMaximum?: number;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsISO8601()
  startDateTime?: string;

  @IsOptional()
  @IsISO8601()
  endDateTime?: string;
}

export class GetLineItemsQueryDto {
  @IsOptional()
  @IsString()
  deploymentId?: string;

  @IsOptional()
  @IsString()
  resource_link_id?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  taskId?: string;

  @IsOptional()
  @IsString()
  taskType?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  offset?: number;
}

// ============= SCORE SUBMISSION DTOs =============

export enum ActivityProgress {
  INITIALIZED = 'Initialized',
  STARTED = 'Started',
  IN_PROGRESS = 'InProgress',
  SUBMITTED = 'Submitted',
  COMPLETED = 'Completed',
}

export enum GradingProgress {
  NOT_READY = 'NotReady',
  FAILED = 'Failed',
  PENDING = 'Pending',
  PENDING_MANUAL = 'PendingManual',
  FULLY_GRADED = 'FullyGraded',
}

export class SubmitScoreDto {
  @IsISO8601()
  timestamp: string;

  @IsNumber()
  @Min(0)
  scoreGiven: number;

  @IsNumber()
  @Min(0)
  scoreMaximum: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsEnum(ActivityProgress)
  activityProgress: ActivityProgress;

  @IsEnum(GradingProgress)
  gradingProgress: GradingProgress;

  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  submissionId?: string;
}

export class ScoreResultDto {
  id: string;
  scoreOf: string; // URL to line item
  userId: string;
  resultScore: number;
  resultMaximum: number;
  comment?: string;
  timestamp?: string;
}
