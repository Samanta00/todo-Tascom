import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JWT_GUARD } from 'src/auth/jwt.strategy';
import { AuthGuard } from '@nestjs/passport';
import { TagsService } from './tags.service';
import { CreatTagDto } from './dto/create-tags.dto';
import { UpdateTagDto } from './dto/update-tags.dto';

@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly tagService: TagsService,
  ) {}

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
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateTask(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTask(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.removeTask(id);
  }

  @UseGuards(AuthGuard(JWT_GUARD))
  @Post('/:taskId/tags')
  createTag(
    @Body() createTagDto: CreatTagDto,
    @Param('taskId', new ParseIntPipe()) taskId: number,
  ) {
    createTagDto.taskId = taskId;
    return this.tagService.create(createTagDto);
  }
  @Patch('/:taskId/tags/:id')
  updateTag(
    @Body() updateTagDto: UpdateTagDto,
    @Param('taskId', new ParseIntPipe()) taskId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    updateTagDto.taskId = taskId;
    return this.tagService.update(id, updateTagDto);
  }
  @Delete('/:taskId/tags/:id')
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.removeTask(id);
  }
}
