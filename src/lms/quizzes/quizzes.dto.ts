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
  @ApiProperty({ type: String, format: 'date-time', required: true, description: 'New end time to extend the quiz to' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  extendedEndTime?: Date;
}

export class QuizUpdateDto {
  @ApiProperty({ type: String, required: true, description: 'Name of the quiz' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({ type: String, required: false, description: 'Optional description of the quiz' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiProperty({ type: String, required: false, description: 'Instructions shown to students before starting' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  instructions?: string;

  @ApiProperty({ type: String, format: 'date-time', required: true, description: 'Scheduled start time for the quiz' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  startTime?: Date;

  @ApiProperty({ type: String, format: 'date-time', required: true, description: 'Scheduled end time for the quiz' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  endTime?: Date;

  @ApiProperty({ type: Boolean, required: true, description: 'Whether the quiz enforces a timed duration' })
  @IsNotEmpty()
  @IsBoolean()
  isDurationRestricted: boolean;

  @ApiProperty({ type: Number, required: false, description: 'Duration of the quiz in minutes (required if isDurationRestricted is true)', minimum: 1 })
  @ValidateIf((o) => o.isDurationRestricted)
  @IsNumber()
  @Min(1)
  @Transform(({ value, obj }) => {
    if (!obj.isDurationRestricted) return null;
    return value;
  })
  duration?: number;

  @ApiProperty({ type: Number, required: true, description: 'Maximum number of attempts allowed per participant', minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  maxAttempts: number;

  @ApiProperty({ type: Number, required: true, description: 'Total marks for the quiz', minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  maxMarks: number;

  @ApiProperty({ type: Boolean, required: true, description: 'Whether questions are shuffled for each participant' })
  @IsNotEmpty()
  @IsBoolean()
  shuffleQuestions: boolean;

  @ApiProperty({ type: Boolean, required: true, description: 'Whether answer options are shuffled for each question' })
  @IsNotEmpty()
  @IsBoolean()
  shuffleOptions: boolean;

  @ApiProperty({ type: Boolean, required: false, description: 'Whether this is a practice quiz (no grades recorded)' })
  @IsOptional()
  @IsBoolean()
  isPracticeQuiz?: boolean;

  @ApiProperty({ type: Boolean, required: false, description: 'Whether full-screen mode is enforced during the quiz' })
  @IsOptional()
  @IsBoolean()
  isFullscreenEnabled?: boolean;
}

export class QuizCreateDto extends QuizUpdateDto {
  @ApiProperty({ type: String, required: true, description: 'Type of quiz', enum: QuizTypes })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(QuizTypes))
  type: string;

  @ApiProperty({ type: Number, required: false, description: 'Classroom ID (required for classroom-subject-based quizzes)' })
  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  classroomId?: number;

  @ApiProperty({ type: Number, required: false, description: 'Subject ID (required for classroom-subject-based quizzes)' })
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
  @ApiProperty({ type: String, required: true, description: 'Name of the quiz part or section' })
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @ApiProperty({ type: String, required: false, description: 'Optional description of this quiz part' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description?: string;

  @ApiProperty({ type: Number, required: true, description: 'Number of questions in this part', minimum: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  numberOfQuestions: number;

  @ApiProperty({ type: Number, required: true, description: 'Marks awarded per correct question', minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  eachQuestionMarks: number;

  @ApiProperty({ type: Number, required: true, description: 'Marks deducted per incorrect answer (negative marking)' })
  @IsNotEmpty()
  @IsNumber()
  eachQuestionNegativeMarks: number;
}

export class AddQuizQuestionsFromQuestionLibraryDto {
  @ApiProperty({ type: [String], required: true, description: 'List of question IDs to add from the question library' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  questionIds: string[];
}

export class QuizRecordsDeleteDto {
  @ApiProperty({ type: [String], required: true, description: 'List of record IDs to delete from the quiz part' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}

export class AddQuizParticipantsDto {
  @ApiProperty({ type: [Number], required: true, description: 'List of student IDs to add as quiz participants' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  studentIds: number[];
}

export class RemoveQuizParticipantsDto {
  @ApiProperty({ type: [String], required: true, description: 'List of participant IDs to remove from the quiz' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  participantIds: string[];
}

export class TypeQuizzesGetDto {
  @ApiProperty({ type: String, required: true, description: 'Quiz type to filter by', enum: QuizTypes })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(QuizTypes))
  type: string;

  @ApiProperty({ type: Number, required: false, description: 'Classroom ID (required for classroom-subject-based quizzes)' })
  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  classroomId?: number;

  @ApiProperty({ type: Number, required: false, description: 'Subject ID (required for classroom-subject-based quizzes)' })
  @ValidateIf((o) => o.type === QuizTypes.CLASSROOM_SUBJECT_BASED_QUIZ)
  @IsNumber()
  subjectId?: number;

  @ApiProperty({ type: String, required: false, description: 'Filter by quiz status', enum: QuizStatus })
  @IsOptional()
  @IsString()
  @IsIn(Object.values(QuizStatus))
  status?: string;

  @ApiProperty({ type: Number, required: false, description: 'Maximum number of results to return', minimum: 1 })
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiProperty({ type: Number, required: false, description: 'Number of results to skip for pagination', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}

export class ExtendQuizParticipantTimeDto {
  @ApiProperty({ type: String, format: 'date-time', required: true, description: 'New end time granted to the participant' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  extendedEndTime: Date;
}

export class BulkExtendQuizParticipantsTimeDto {
  @ApiProperty({ type: [String], required: true, description: 'List of participant IDs to extend time for' })
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  participantIds: string[];

  @ApiProperty({ type: String, format: 'date-time', required: true, description: 'New end time granted to all selected participants' })
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @IsDate()
  extendedEndTime: Date;
}
