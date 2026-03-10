import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

const TOPIC_ACTIVITY_TYPE = [
  'QUIZ',
  'ASSIGNMENT',
  'EBOOK',
  'VIDEO',
  'PLAYLIST',
  'YOUTUBE',
] as const;
const TOPIC_ACTIVITY_STATUS = ['ACTIVE', 'INACTIVE'] as const;

type TopicActivityType = (typeof TOPIC_ACTIVITY_TYPE)[number];
type TopicActivityStatus = (typeof TOPIC_ACTIVITY_STATUS)[number];

export class VideoDataDto {
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
}

export class PlaylistDataDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  kalturaPlaylistId: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class YoutubeDataDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  youtubeVideoId: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  youtubeUrl: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class TopicActivityCreateDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  topicId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  classroomSubjectId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  subjectId?: number;

  @IsNotEmpty()
  @IsIn(TOPIC_ACTIVITY_TYPE)
  activityType: TopicActivityType;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  orderIndex?: number;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsIn(TOPIC_ACTIVITY_STATUS)
  status?: TopicActivityStatus;

  @ValidateNested()
  @Type(() => VideoDataDto)
  @ValidateIf((o) => o.activityType === 'VIDEO')
  videoData?: VideoDataDto;

  @ValidateNested()
  @Type(() => PlaylistDataDto)
  @ValidateIf((o) => o.activityType === 'PLAYLIST')
  playlistData?: PlaylistDataDto;

  @ValidateNested()
  @Type(() => YoutubeDataDto)
  @ValidateIf((o) => o.activityType === 'YOUTUBE')
  youtubeData?: YoutubeDataDto;
}

export class TopicActivityUpdateDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  subjectId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  classroomSubjectId?: number;

  @IsOptional()
  @IsIn(TOPIC_ACTIVITY_TYPE)
  activityType?: TopicActivityType;

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
  orderIndex?: number;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsIn(TOPIC_ACTIVITY_STATUS)
  status?: TopicActivityStatus;

  @ValidateNested()
  @Type(() => VideoDataDto)
  @ValidateIf((o) => o.activityType === 'VIDEO')
  videoData?: VideoDataDto;

  @ValidateNested()
  @Type(() => PlaylistDataDto)
  @ValidateIf((o) => o.activityType === 'PLAYLIST')
  playlistData?: PlaylistDataDto;

  @ValidateNested()
  @Type(() => YoutubeDataDto)
  @ValidateIf((o) => o.activityType === 'YOUTUBE')
  youtubeData?: YoutubeDataDto;
}

export class GetTopicActivitiesDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  topicId: number;
}

export class GetTopicActivitiesByClassroomSubjectDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  classroomSubjectId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  topicId?: number;
}

export class UpdateActivityOrderDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  newOrderIndex: number;
}

export class GetTopicActivitiesBySubjectDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  subjectId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  topicId?: number;
}
