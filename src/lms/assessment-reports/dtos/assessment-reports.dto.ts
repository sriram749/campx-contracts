import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AssessmentResultSummaryReportDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsOptional()
  @IsString()
  branchCode?: string;

  @IsNotEmpty()
  @IsString()
  batch: string;

  @IsNotEmpty()
  @IsNumber()
  semNo: number;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsNumber()
  subjectId?: number;

  @IsOptional()
  @IsNumber()
  assessmentTypeId?: number;

  @IsOptional()
  @IsString()
  assessmentName?: string;

  @IsNotEmpty()
  @IsNumber()
  fromValue: number;

  @IsNotEmpty()
  @IsNumber()
  toValue: number;
}

export class GetAssessmentReportDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsOptional()
  @IsString()
  branchCode?: string;

  @IsNotEmpty()
  @IsString()
  batch: string;

  @IsNotEmpty()
  @IsNumber()
  semNo: number;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsNumber()
  subjectId?: number;

  @IsOptional()
  @IsNumber()
  assessmentTypeId?: number;

  @IsOptional()
  @IsNumber()
  subjectTypeId?: number;

  @IsOptional()
  @IsNumber()
  studentId?: number;

  @IsOptional()
  @IsString()
  assessmentName?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  keepDetained?: boolean;
}

export class GetAssessmentTypeReportDto {
  @IsNotEmpty()
  @IsNumber()
  classroomId: number;

  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsNotEmpty()
  @IsNumber()
  assessmentTypeId: number;

  @IsOptional()
  @IsNumber()
  studentId?: number;
}

export class GetSubjectInternalMarksDto {
  @IsNotEmpty()
  @IsNumber()
  subjectId: number;

  @IsNotEmpty()
  @IsString()
  batch: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return undefined;
  })
  keepDetained?: boolean;
}

export class GroupedAssessmentsReportGetDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsString()
  batch: string;

  @IsNotEmpty()
  @IsNumber()
  semNo: number;

  @IsOptional()
  @IsString()
  branchCode?: string;

  @IsOptional()
  @IsString()
  section?: string;

  @IsOptional()
  @IsNumber()
  subjectTypeId?: number;

  @IsOptional()
  @IsNumber()
  subjectId?: number;
}

export class GetInternalMarksCumulativeSummarySubjectWiseReportDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsOptional()
  @IsString()
  branchCode?: string;

  @IsNotEmpty()
  @IsString()
  batch: string;

  @IsOptional()
  @IsString()
  section: string;

  @IsNotEmpty()
  @IsNumber()
  semNo: number;
}

export class GetInternalMarksCummulativeAssessmentSubjectReportDto {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsOptional()
  @IsString()
  branchCode?: string;

  @IsNotEmpty()
  @IsString()
  batch: string;

  @IsNotEmpty()
  @IsNumber()
  semNo: number;

  @IsOptional()
  @IsNumber()
  subjectTypeId?: number;
}
