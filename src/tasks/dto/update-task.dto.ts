import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsString, IsNumber } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  title: string;

  @IsString()
  status: string;

  @IsString()
  description: string;

  @IsNumber()
  priority: number;
}
