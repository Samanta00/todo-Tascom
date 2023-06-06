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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TasksTodoSwagger } from './dto/swegger/sweggerTasks-todo.swegger';
import { TagsTodoSwagger } from './dto/swegger/sweggerTags-todo.swegger';


@Controller('tasks')
@ApiTags("todos")
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly tagService: TagsService,
  ) {}

  
  @UseGuards(AuthGuard(JWT_GUARD))
  @Post()
  @ApiOperation({summary:"Create a new Task"})
  @ApiResponse({
    status:201,
    description:"The new task has been successfully added",
  })
  @ApiResponse({status:404,description:"task don't created"})
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get()
  @ApiOperation({summary:"View All Tasks"})
  @ApiResponse({
    status:200,
    description:"tasks returned from a successful task",
    type:TasksTodoSwagger,
    isArray:true
  })
  @ApiResponse({status:404,description:"tasks not found"})
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary:"View a specific Tasks by id"})
  @ApiResponse({status:200,description:"specific task returned from a successful task"})
  @ApiResponse({status:404,description:"task not found"})
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({summary:"Update a specific Tasks by id"})
  @ApiResponse({status:200,description:"specific task was update"})
  @ApiResponse({status:404,description:"task don't updated"})
  @HttpCode(HttpStatus.OK)
  updateTask(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({summary:"Delete a specific Tasks by id"})
  @ApiResponse({status:200,description:"specific task was deleted"})
  @ApiResponse({status:404,description:"task don't deleted"})
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTask(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.removeTask(id);
  }






  @UseGuards(AuthGuard(JWT_GUARD))
  @Post('/:taskId/tags')
  @ApiOperation({summary:"create a tag assigned to a task"})
  @ApiResponse({status:201,description:"The new tag has been successfully added"})
  @ApiResponse({status:404,description:"tag don't created"})
  createTag(
    @Body() createTagDto: CreatTagDto,
    @Param('taskId', new ParseIntPipe()) taskId: number,
  ) {
    createTagDto.taskId = taskId;
    return this.tagService.create(createTagDto);
  }

  
  @Get("/tags")
  @ApiOperation({summary:"View all tags"})
  @ApiResponse({status:200,
    description:"tags returned from a successful task",
    type:TagsTodoSwagger,
    isArray:true
  })
  @ApiResponse({status:404,description:"tags not found"})
  @HttpCode(HttpStatus.OK)
  async findAlltag() {
    return this.tagService.findAlltag();
  }

  
  @Get('/:id')
  @ApiOperation({summary:"View tag by id"})
  @ApiResponse({status:200,description:"specific tag returned from a successful task"})
  @ApiResponse({status:404,description:"tag not found"})
  @HttpCode(HttpStatus.OK)
  findOneTag(@Param('id', new ParseIntPipe()) id: number) {
    return this.tasksService.findOne(id);
  }

  
  @Patch('/:taskId/tags/:id')
  @ApiOperation({summary:"Edit tag by id"})
  @ApiResponse({status:200,description:"specific tag was update"})
  @ApiResponse({status:404,description:"tag don't updated"})
  updateTag(
    @Body() updateTagDto: UpdateTagDto,
    @Param('taskId', new ParseIntPipe()) taskId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    updateTagDto.taskId = taskId;
    return this.tagService.update(id, updateTagDto);
  }

  @Delete('/:taskId/tags/:id')
  @ApiOperation({summary:"Remove tag by id"})
  @ApiResponse({status:200,description:"specific tag was deleted"})
  @ApiResponse({status:404,description:"tag don't deleted"})
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', new ParseIntPipe()) id: number) {
    return this.tagService.remove(id);
  }

}
