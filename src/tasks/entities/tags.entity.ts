import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Task } from './task.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'tags' })
export class Tags extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  @ApiProperty()
  id: number;

  @Column
  @ApiProperty()
  name: string;

  @Column
  @ApiProperty()
  cor: string;

  @ForeignKey(() => Task)
  @Column({ field: 'task_id' })
  @ApiProperty()
  taskId: number;
}
