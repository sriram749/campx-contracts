import { IsDate, IsOptional, IsString } from "class-validator/types/decorator/decorators";

class TestingDto {
  @IsString()
  name: string;

  @IsOptional() 
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  submissionStartDate?: Date;
}