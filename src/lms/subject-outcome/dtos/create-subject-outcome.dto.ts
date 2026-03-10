import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export enum BloomsLevelEnum {
  REMEMBER = 'remember',
  UNDERSTAND = 'understand',
  APPLY = 'apply',
  ANALYZE = 'analyze',
  EVALUATE = 'evaluate',
  CREATE = 'create',
}

export class CreateSubjectOutcomeDto {
  @IsNotEmpty()
  @IsNumber()
  regulationId: number;

  @IsNotEmpty()
  @IsNumber()
  masterCourseId: number;

  @IsNotEmpty()
  @IsNumber()
  outcomeNumber: number;

  @IsOptional()
  @IsArray()
  @IsEnum(BloomsLevelEnum, { each: true })
  bloomsLevel?: BloomsLevelEnum[];

  @IsOptional()
  @IsString()
  description?: string;
}
