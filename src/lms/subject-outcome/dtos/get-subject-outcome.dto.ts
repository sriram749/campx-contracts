import { IsNumber, IsOptional } from 'class-validator';

export class GetSubjectOutcomeDto {
  @IsOptional()
  @IsNumber()
  regulationId?: number;

  @IsOptional()
  @IsNumber()
  masterCourseId?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  offset?: number;
}
