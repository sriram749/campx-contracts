import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ScoreCalculationType } from 'src/domain/entities/assessment-rule.entity';

export class PostAssessmentTemplateDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;
}

export class AssessmentScoreCalculationDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  percentageWeightage: number[];
}

export class AssessmentRuleDto {
  @IsNotEmpty()
  @IsNumber()
  assessmentTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  weightage: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  maxMarks: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  passPercentage?: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  assessmentsConducted: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  assessmentsGraded: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(ScoreCalculationType))
  scoreCalculationType: string;

  @ValidateIf((o) => o.scoreCalculationType === ScoreCalculationType.PERCENTAGE)
  @IsObject()
  @ValidateNested()
  @Transform(({ value, obj }) => {
    if (obj.scoreCalculationType !== ScoreCalculationType.PERCENTAGE) return undefined;
    return value;
  })
  scoreCalculation?: AssessmentScoreCalculationDto;
}

export class AssessmentRuleAssessmentTypeDto {
  @IsNotEmpty()
  @IsNumber()
  assessmentTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  assessmentNumber: number;
}

export class AssessmentRuleGroupTypeDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AssessmentRuleAssessmentTypeDto)
  rules: AssessmentRuleAssessmentTypeDto[];
}

export class AssessmentRuleGroupDto {
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  consideredGroups: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(ScoreCalculationType))
  scoreCalculationType: string;

  @ValidateIf((o) => o.scoreCalculationType === ScoreCalculationType.PERCENTAGE)
  @IsObject()
  @ValidateNested()
  @Transform(({ value, obj }) => {
    if (obj.scoreCalculationType !== ScoreCalculationType.PERCENTAGE) return undefined;
    return value;
  })
  scoreCalculation?: AssessmentScoreCalculationDto;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightage?: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AssessmentRuleGroupTypeDto)
  ruleGroups: AssessmentRuleGroupTypeDto[];
}

export class PostAssessmentTemplateDetailsDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssessmentRuleDto)
  assessmentRules: AssessmentRuleDto[];

  @IsNotEmpty()
  @IsBoolean()
  hasGroups: boolean;

  @ValidateIf((o) => o.hasGroups)
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AssessmentRuleGroupDto)
  groups?: AssessmentRuleGroupDto[];
}

export class GetAssessmentTemplatesDto {
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
  offset?: number;
}

export class AssessmentTemplatesGetDto {
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  ids?: number[];
}
