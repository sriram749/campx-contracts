import { Transform, Type } from 'class-transformer';
import {
  IsArray,
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
import {
  QuestionDifficultyLevel,
  QuestionStatus,
  QuestionType,
} from 'src/domain/schemas/question.schema';

export class QuestionStructureOptionPostDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  value: string;

  @IsNotEmpty()
  @IsString()
  isCorrect: string;

  @IsOptional()
  @IsString()
  isEquation: string;

  @IsOptional()
  @IsString()
  hasImage: string;
}

export class QuestionStructurePostDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(QuestionType))
  questionType: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(QuestionDifficultyLevel))
  difficultyLevel: string;

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
  @Type(() => Number)
  @IsNumber()
  unitNumber?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  unitName?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  topicId?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  topicName?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  maxMarks: number;

  @IsOptional()
  @IsNumber()
  negativeMarks?: number;

  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  question: string;

  @IsOptional()
  @IsString()
  isEquation?: string;

  @IsOptional()
  @IsString()
  hasImage?: string;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  correctAnswer?: string;

  @ValidateIf((o) => o.questionType !== QuestionType.DESC)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuestionStructureOptionPostDto)
  options?: QuestionStructureOptionPostDto[];
}

export class QuestionPostDto extends QuestionStructurePostDto {
  @IsNotEmpty()
  @IsString()
  questionLibraryId: string;
}

export class uploadQuestionOptionDto {
  @IsNotEmpty()
  @IsString()
  key: string;
}

export class addCommentDto {
  @IsNotEmpty()
  @IsString()
  comment: string;
}

export class LibraryQuestionsGetDto {
  @IsNotEmpty()
  @IsString()
  questionLibraryId: string;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(QuestionType))
  questionType?: string;

  @IsOptional()
  @IsArray()
  excludeIds?: string[];

  @IsOptional()
  @IsString()
  @IsIn(Object.values(QuestionStatus))
  status?: string;

  @IsOptional()
  @IsNumber()
  maxMarks?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(QuestionDifficultyLevel))
  difficultyLevel?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  unitNumber?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  topicId?: number;
}

export class QuestionsImportDto {
  @IsNotEmpty()
  @IsString()
  questionLibraryId: string;
}

export class DeleteQuestionsDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  questionIds: string[];
}

export class ChangeStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(QuestionStatus))
  status: string;

  @IsNotEmpty()
  @IsArray()
  ids: string[];
}

export class SubjectQuestionsGetDto {
  @IsNotEmpty()
  @IsString()
  courseCode: string;
}
