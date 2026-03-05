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
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({ type: Date, required: false, description: 'extendedEndTime' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  extendedEndTime?: Date;
}

export class QuizUpdateDto {
  @ApiProperty({ type: String, required: true, description: 'name' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({ type: String, required: false, description: 'description' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiProperty({ type: String, required: false, description: 'instructions' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  instructions?: string;

  @ApiProperty({ type: Date, required: false, description: 'startTime' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  startTime?: Date;

  @ApiProperty({ type: Date, required: false, description: 'endTime' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  endTime?: Date;

  @ApiProperty({ type: Boolean, required: true, description: 'isDurationRestricted' })
  @IsNotEmpty()
  @IsBoolean()
  isDurationRestricted: boolean;

  @ApiProperty({ type: Number, required: false, description: 'duration', minimum: 1 })
  @ValidateIf((o) => o.isDurationRestricted)
  @IsNumber()
  @Min(1)
  @Transform(({ value, obj }) => {
    if (!obj.isDurationRestricted) return null;
    return value;
  })
  duration?: number;

  @ApiProperty({ type: Number, required: true, description: 'maxAttempts', minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  maxAttempts: number;

  @ApiProperty({ type: Number, required: true, description: 'maxMarks', minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  maxMarks: number;

  @ApiProperty({ type: Boolean, required: true, description: 'shuffleQuestions' })
  @IsNotEmpty()
  @IsBoolean()
  shuffleQuestions: boolean;

  @ApiProperty({ type: Boolean, required: true, description: 'shuffleOptions' })
  @IsNotEmpty()
  @IsBoolean()
  shuffleOptions: boolean;

  @ApiProperty({ type: Boolean, required: false, description: 'isPracticeQuiz' })
  @IsOptional()
  @IsBoolean()
  isPracticeQuiz?: boolean;

  @ApiProperty({ type: Boolean, required: false, description: 'isFullscreenEnabled' })
  @IsOptional()
  @IsBoolean()
  isFullscreenEnabled?: boolean;
}

export class QuizCreateDto extends QuizUpdateDto {
  @ApiProperty({ type: String, required: true, description: 'type', enum: QuizTypes })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(QuizTypes))
  type: string;

  @ApiProperty({ type: Number, required: false, description: 'classroomId' })
  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  classroomId?: number;

  @ApiProperty({ type: Number, required: false, description: 'subjectId' })
  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  subjectId?: number;
}

export class ActiveStudentQuizzesDto {
  @ApiProperty({ type: Number, required: true, description: 'subjectId' })
  @IsNotEmpty()
  @IsNumber()
  subjectId: number;
}

export class QuizPartPostDto {
  @ApiProperty({ type: String, required: true, description: 'name' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({ type: String, required: false, description: 'description' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiProperty({ type: Number, required: true, description: 'numberOfQuestions', minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numberOfQuestions: number;

  @ApiProperty({ type: Number, required: true, description: 'eachQuestionMarks', minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  eachQuestionMarks: number;

  @ApiProperty({ type: Number, required: true, description: 'eachQuestionNegativeMarks' })
  @IsNotEmpty()
  @IsNumber()
  eachQuestionNegativeMarks: number;
}

export class AddQuizQuestionsFromQuestionLibraryDto {
  @ApiProperty({ type: [String], required: true, description: 'questionIds' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  questionIds: string[];
}

export class QuizRecordsDeleteDto {
  @ApiProperty({ type: [String], required: true, description: 'ids' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}

export class AddQuizParticipantsDto {
  @ApiProperty({ type: [Number], required: true, description: 'studentIds' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  studentIds: number[];
}

export class RemoveQuizParticipantsDto {
  @ApiProperty({ type: [String], required: true, description: 'participantIds' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  participantIds: string[];
}

export class TypeQuizzesGetDto {
  @ApiProperty({ type: String, required: true, description: 'type', enum: QuizTypes })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(QuizTypes))
  type: string;

  @ApiProperty({ type: Number, required: false, description: 'classroomId' })
  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  classroomId?: number;

  @ApiProperty({ type: Number, required: false, description: 'subjectId' })
  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  subjectId?: number;

  @ApiProperty({ type: String, required: false, description: 'status', enum: QuizStatus })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(QuizStatus))
  status?: string;

  @ApiProperty({ type: Number, required: false, description: 'limit', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({ type: Number, required: false, description: 'skip', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}

export class ExtendQuizParticipantTimeDto {
  @ApiProperty({ type: Date, required: true, description: 'extendedEndTime' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  extendedEndTime: Date;
}

export class BulkExtendQuizParticipantsTimeDto {
  @ApiProperty({ type: [String], required: true, description: 'participantIds' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  participantIds: string[];

  @ApiProperty({ type: Date, required: true, description: 'extendedEndTime' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  extendedEndTime: Date;
}

export class GetQuizzesDto {
  @ApiProperty({ type: Number, required: true, description: 'classroomId' })
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @ApiProperty({ type: Number, required: false, description: 'subjectId' })
  @IsOptional()
  @IsNumber()
  subjectId?: number;

  @ApiProperty({ type: String, required: false, description: 'search' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ type: Number, required: false, description: 'limit', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({ type: Number, required: false, description: 'skip', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}
