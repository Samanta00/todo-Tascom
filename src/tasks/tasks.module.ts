import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Tags } from './entities/tags.entity';
import { Task } from './entities/task.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TagsService } from './tags.service';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    TagsService,
    {
      provide: 'TASK_REPOSITORY',
      useValue: Task,
    },
    {
      provide: 'TAG_REPOSITORY',
      useValue: Tags,
    },
  ],
  imports: [SequelizeModule.forFeature([Tags, Task])],
})
export class TasksModule {}
