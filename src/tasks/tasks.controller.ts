import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JWT_GUARD } from 'src/auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { Observable, of } from 'rxjs';
import { Task } from './entities/task.entity';
import { Tags } from './entities/tags.entity';
import { TagsService } from './tags.service';
import { CreatTagDto } from './dto/create-tags.dto';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService, private readonly tagService: TagsService) {}

  @UseGuards(AuthGuard(JWT_GUARD))
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOneTask(@Param('id') id: string) {
    return this.tasksService.findOneTask(+id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(+id, updateTaskDto);
  }

  @Delete(':id')
  removeTask(@Param('id') id: string) {
    return this.tasksService.removeTask(+id);
  }
  @UseGuards(AuthGuard(JWT_GUARD))
  @Post("/:taskId/tags")
  createTag(@Body() createTagDto: CreatTagDto, @Param("taskId", new ParseIntPipe()) taskId:number) {
    createTagDto.taskId=taskId;
    return this.tagService.create(createTagDto);
  }
}
