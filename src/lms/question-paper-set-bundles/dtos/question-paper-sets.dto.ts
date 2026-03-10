import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class AddTemplateToQuestionPaperSetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsNotEmpty()
  @IsString()
  questionPaperTemplateId: string;

  // Optional exam details
  @IsOptional()
  @IsString()
  examDate?: string;

  @IsOptional()
  @IsString()
  examStartTime?: string;

  @IsOptional()
  @IsString()
  examEndTime?: string;

  @IsOptional()
  @IsString()
  examDuration?: string;

  @IsOptional()
  @IsString()
  applicableBranches?: string;

  @IsOptional()
  @IsString()
  branchType?: string; // 'common' or 'only'
}

export class GetQuestionPaperSetBundleDto {
  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  skip?: number;
}

export class AddQuestionPaperSetDto {
  @IsNotEmpty()
  @IsString()
  questionPaperSetBundleId: string;
}

export class RemoveQuestionPaperSetDto {
  @IsNotEmpty()
  @IsString()
  questionPaperSetBundleId: string;

  @IsNotEmpty()
  @IsString()
  paperSetId: string;
}

export class GeneratePaperSetsQuestionsDto {
  @IsNotEmpty()
  @IsString()
  questionPaperSetBundleId: string;

  @IsNotEmpty()
  @IsBoolean()
  generateAllQuestions: boolean;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  paperSetIds: string[];
}

export class AddPaperSetQuestionDto {
  @IsNotEmpty()
  @IsString()
  questionPaperSetBundleId: string;

  @IsNotEmpty()
  @IsString()
  paperSetId: string;

  @IsNotEmpty()
  @IsString()
  schemaQuestionId: string;

  @IsNotEmpty()
  @IsString()
  questionId: string;
}

export class RemovePaperSetQuestionDto {
  @IsNotEmpty()
  @IsString()
  questionPaperSetBundleId: string;

  @IsNotEmpty()
  @IsString()
  paperSetId: string;

  @IsNotEmpty()
  @IsString()
  schemaQuestionId: string;
}

export class GetPaperSetSuggestedQuestionsDto {
  @IsNotEmpty()
  @IsString()
  questionPaperSetBundleId: string;

  @IsNotEmpty()
  @IsString()
  paperSetId: string;

  @IsNotEmpty()
  @IsString()
  schemaQuestionId: string;

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
