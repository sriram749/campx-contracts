import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BloomsLevelEnum } from './create-subject-outcome.dto';

export class UpdateSubjectOutcomeDto {
  @IsOptional()
  @IsNumber()
  outcomeNumber?: number;

  @IsOptional()
  @IsArray()
  @IsEnum(BloomsLevelEnum, { each: true })
  bloomsLevel?: BloomsLevelEnum[];

  @IsOptional()
  @IsString()
  description?: string;
}
