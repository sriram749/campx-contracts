import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SaveQuizQuestionResponseDto {
  @IsNotEmpty()
  @IsString()
  partId: string;

  @IsNotEmpty()
  @IsString()
  questionId: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  selectedOptionIds: string[];

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  blanksAnswers: string[];

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  descAnswer: string;
}

export class GetQuizResponseQuestionDto {
  @IsNotEmpty()
  @IsString()
  partId: string;

  @IsNotEmpty()
  @IsString()
  questionId: string;
}
