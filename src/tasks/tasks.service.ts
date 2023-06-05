import { Inject, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
//import { Task } from './entities/task.entity';
import { Tags } from './entities/tags.entity';
import { of } from 'rxjs';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly taskModel: typeof Task,
  ) {}

  //criando uma nova tarefa
  async createTask(createTaskDto: CreateTaskDto) {
    console.log(createTaskDto);
    const newTask = this.taskModel.create(createTaskDto as any);
    return newTask;
  }

  //encontrando todas as tarefas
  async findAll(): Promise<any> {
    return await this.taskModel.findAll({
      include: [
        {
          model: Tags,
        },
      ],
      order: [['priority', 'DESC']],
    });
  }

  //encontrando uma tarefa em específico
  async findOne(id: number) {
    const task = await this.taskModel.findOne({ where: { id } });
    if (!task) throw new NotFoundException("task don't found");
    return task;
  }

  //atualizando uma tarefa em específico
  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const taskCount = await this.taskModel.count({ where: { id } });

    if (taskCount === 0) throw new NotFoundException("task don't found");

    await this.taskModel.update(updateTaskDto, { where: { id } });
    return { id, ...updateTaskDto };
  }

  //removendo uma tarefa em específico
  async removeTask(id: number) {
    const task = await this.findOne(id);
    await task.destroy();
  }
}
