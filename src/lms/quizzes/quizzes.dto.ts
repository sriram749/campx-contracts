import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export enum QuizStatus {
  Draft = 'draft',
  Published = 'published',
  Archived = 'archived',
}

export enum QuizTypes {
  CLASSROOM_SUBJECT_BASED_QUIZ = 'classroom_subject_based_quiz',
  STANDALONE_QUIZ = 'standalone_quiz',
}

export class QuizExtendDto {
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  extendedEndTime?: Date;
}

export class QuizUpdateDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  instructions?: string;

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  startTime?: Date;

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  endTime?: Date;

  @IsNotEmpty()
  @IsBoolean()
  isDurationRestricted: boolean;

  @ValidateIf((o) => o.isDurationRestricted)
  @IsNumber()
  @Min(1)
  @Transform(({ value, obj }) => {
    if (!obj.isDurationRestricted) return null;
    return value;
  })
  duration?: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  maxAttempts: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  maxMarks: number;

  @IsNotEmpty()
  @IsBoolean()
  shuffleQuestions: boolean;

  @IsNotEmpty()
  @IsBoolean()
  shuffleOptions: boolean;

  @IsOptional()
  @IsBoolean()
  isPracticeQuiz?: boolean;

  @IsOptional()
  @IsBoolean()
  isFullscreenEnabled?: boolean;
}

export class QuizCreateDto extends QuizUpdateDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(QuizTypes))
  type: string;

  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  classroomId?: number;

  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  subjectId?: number;
}

export class ActiveStudentQuizzesDto {
  @IsNotEmpty()
  @IsNumber()
  subjectId: number;
}

export class QuizPartPostDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numberOfQuestions: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  eachQuestionMarks: number;

  @IsNotEmpty()
  @IsNumber()
  eachQuestionNegativeMarks: number;
}

export class AddQuizQuestionsFromQuestionLibraryDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  questionIds: string[];
}

export class QuizRecordsDeleteDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}

export class AddQuizParticipantsDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  studentIds: number[];
}

export class RemoveQuizParticipantsDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  participantIds: string[];
}

export class TypeQuizzesGetDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(QuizTypes))
  type: string;

  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  classroomId?: number;

  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  subjectId?: number;

  @IsOptional()
  @IsString()
  @IsIn(Object.values(QuizStatus))
  status?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}

export class ExtendQuizParticipantTimeDto {
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  extendedEndTime: Date;
}

export class BulkExtendQuizParticipantsTimeDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  participantIds: string[];

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  extendedEndTime: Date;
}

export class GetQuizzesDto {
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @IsOptional()
  @IsNumber()
  subjectId?: number;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}
