import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Tags } from './tags.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'tasks' })
export class Task extends Model<Task> {
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
  title: string;

  @Column
  @ApiProperty()
  status: string;

  @Column
  @ApiProperty()
  description: string;

  @Column
  @ApiProperty()
  priority: number;

  @HasMany(() => Tags)
  @ApiProperty()
  tags?: Tags[];



}
