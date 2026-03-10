import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLtiDeploymentDto {
  @IsNotEmpty()
  @IsString()
  toolId: string;

  @IsNotEmpty()
  @IsString()
  publicKeyUrl: string;

  @IsNotEmpty()
  @IsString()
  authUrl: string;

  @IsNotEmpty()
  @IsString()
  tokenUrl: string;

  @IsNotEmpty()
  @IsString()
  clientId: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateLtiDeploymentDto {
  @IsOptional()
  @IsString()
  toolId?: string;

  @IsOptional()
  @IsString()
  publicKeyUrl?: string;

  @IsOptional()
  @IsString()
  authUrl?: string;

  @IsOptional()
  @IsString()
  tokenUrl?: string;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class GetLtiDeploymentsDto {
  @IsOptional()
  @IsString()
  toolId?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  skip?: number;
}

export class InitiateLtiLaunchDto {
  @IsNotEmpty()
  @IsString()
  deploymentId: string;

  @IsNotEmpty()
  @IsString()
  contextId: string;

  @IsNotEmpty()
  @IsString()
  resourceLinkId: string;

  @IsNotEmpty()
  @IsString()
  taskId: string;

  @IsNotEmpty()
  @IsString()
  taskType: string;

  @IsOptional()
  @IsString()
  contextType?: string;

  @IsOptional()
  @IsString()
  contextTitle?: string;

  @IsOptional()
  @IsString()
  contextLabel?: string;

  @IsNotEmpty()
  @IsString()
  resourceTitle: string;

  @IsOptional()
  @IsString()
  resourceDescription?: string;

  @IsOptional()
  @IsString()
  targetLinkUri?: string;

  @IsOptional()
  @IsBoolean()
  isDeepLinking?: boolean;
}

export class LtiAuthCallbackDto {
  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  nonce: string;

  @IsNotEmpty()
  @IsString()
  client_id: string;

  @IsNotEmpty()
  @IsString()
  redirect_uri: string;

  @IsOptional()
  @IsString()
  lti_message_hint?: string;

  @IsOptional()
  @IsString()
  login_hint?: string;

  @IsOptional()
  @IsString()
  response_type?: string;

  @IsOptional()
  @IsString()
  response_mode?: string;

  @IsOptional()
  @IsString()
  scope?: string;

  @IsOptional()
  @IsString()
  prompt?: string;
}
