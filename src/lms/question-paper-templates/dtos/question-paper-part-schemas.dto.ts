import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from 'src/domain/schemas/question.schema';

export class QuestionPaperSchemaGroupPostDto {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  @Min(0, { each: true })
  orderValues: number[];
}

export class QuestionPaperChoicePartDto {
  @IsNotEmpty()
  @IsString()
  partId: string;

  @IsNotEmpty()
  @IsNumber()
  numberOfQuestionsToAttempt: number;
}

export class QuestionPaperSchemaPartPostDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  slno?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  marks: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numberOfQuestions: number;

  @IsOptional()
  @IsArray()
  @IsIn(Object.values(QuestionType), { each: true })
  questionsType: string[];

  @IsNotEmpty()
  @IsBoolean()
  hasChoice: boolean;

  @IsNotEmpty()
  @IsBoolean()
  isChoicePart: boolean;

  @ValidateIf((o) => o.isChoicePart)
  choicePart: QuestionPaperChoicePartDto;

  @ValidateIf((o) => o.hasChoice)
  @IsBoolean()
  hasGroups: boolean;

  @ValidateIf((o) => o.hasChoice && !o.hasGroups)
  @IsNumber()
  @Min(1)
  numberOfQuestionsToAttempt: number;

  @ValidateIf((o) => o.hasChoice && o.hasGroups)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionPaperSchemaGroupPostDto)
  groups: QuestionPaperSchemaGroupPostDto[];
}

export class QuestionPaperSchemaQuestionPostDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  slno?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  coMapping?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(6)
  taxonomyLevel?: number;

  @IsOptional()
  @IsNumber()
  unitNumber?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  unitName?: string;

  @IsOptional()
  @IsNumber()
  topicId?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  topicName?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  marks: number;

  @IsNotEmpty()
  @IsBoolean()
  hasQuestions: boolean;

  @ValidateIf((o) => o.hasQuestions)
  @IsNumber()
  @Min(1)
  numberOfQuestions: number;

  @IsNotEmpty()
  @IsBoolean()
  hasChoice: boolean;

  @ValidateIf((o) => o.hasChoice)
  @IsBoolean()
  hasGroups: boolean;

  @ValidateIf((o) => o.hasChoice && !o.hasGroups)
  @IsNumber()
  @Min(1)
  numberOfQuestionsToAttempt: number;

  @ValidateIf((o) => o.hasChoice && o.hasGroups)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionPaperSchemaGroupPostDto)
  groups: QuestionPaperSchemaGroupPostDto[];

  @ValidateIf((o) => o.hasQuestions)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionPaperSchemaQuestionPostDto)
  questions: QuestionPaperSchemaQuestionPostDto[];
}

export class QuestionPaperSchemaGetDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalMarks?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}
