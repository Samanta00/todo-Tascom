import { IsString } from 'class-validator';

export class CreatTagDto {
  taskId?: number;

  @IsString()
  name: string;

  @IsString()
  cor: string;
}
