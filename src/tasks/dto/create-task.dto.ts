import { IsString, Min, Max } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  status: string;

  @IsString()
  description: string;

  @Min(1)
  @Max(10)
  priority: number;
}
