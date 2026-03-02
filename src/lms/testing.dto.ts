import { IsDate, IsOptional, IsString } from "class-validator/types/decorator/decorators";

class TestingDto {
  @IsString()
  name: string;

  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  submissionStartDate?: Date;
}