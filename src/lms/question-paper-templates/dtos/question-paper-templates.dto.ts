import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { QuestionPaperTemplateUserRole } from 'src/domain/schemas/question-paper-template.schema';

export class QuestionPaperTemplateDto {
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
  @Min(0)
  maxMarks: number;
}

export class PostQuestionPaperTemplateUserDto {
  @IsNotEmpty()
  @IsString()
  globalUserId: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([QuestionPaperTemplateUserRole.Editor, QuestionPaperTemplateUserRole.Viewer])
  role: string;
}

export class PostQuestionPaperTemplateUsersDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostQuestionPaperTemplateUserDto)
  users: PostQuestionPaperTemplateUserDto[];
}

export class GetMyQuestionPaperTemplatesDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  search?: string;

  @IsOptional()
  @IsString()
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
export class CloneQuestionPaperTemplateDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;
}

export class GetQuestionPaperTemplateLogsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}
