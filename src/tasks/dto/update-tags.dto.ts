import { IsString } from 'class-validator';
import { CreatTagDto } from './create-tags.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTag extends PartialType(CreatTagDto) {
  @IsString()
  name: string;

  @IsString()
  cor: string;
}
