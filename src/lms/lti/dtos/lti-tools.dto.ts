import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { LtiToolCategory } from 'src/domain/schemas/lti-tool.schema';

export class CapabilitiesDto {
  @IsOptional()
  @IsBoolean()
  supports_ags?: boolean;

  @IsOptional()
  @IsBoolean()
  supports_nrps?: boolean;

  @IsOptional()
  @IsBoolean()
  supports_deep_linking?: boolean;

  @IsOptional()
  @IsBoolean()
  supports_grade_sync?: boolean;

  @IsOptional()
  @IsBoolean()
  supports_roster_sync?: boolean;

  @IsOptional()
  @IsBoolean()
  supports_custom_parameters?: boolean;
}

export class CreateLtiToolDto {
  @IsNotEmpty()
  @IsString()
  vendor: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  version: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(Object.values(LtiToolCategory))
  category?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  documentation_url?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CapabilitiesDto)
  capabilities?: CapabilitiesDto;
}

export class UpdateLtiToolDto {
  @IsOptional()
  @IsString()
  vendor?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  version?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(Object.values(LtiToolCategory))
  category?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  documentation_url?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CapabilitiesDto)
  capabilities?: CapabilitiesDto;
}

export class GetLtiToolsDto {
  @IsOptional()
  @IsString()
  vendor?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip?: number;
}
