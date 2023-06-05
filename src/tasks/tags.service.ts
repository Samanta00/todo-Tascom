import { Inject, Injectable, NotFoundException, Param } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreatTagDto} from './dto/create-tags.dto';
import { UpdateTagDto } from './dto/update-tags.dto';
import { of } from 'rxjs';
import { Tags } from './entities/tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAG_REPOSITORY')
    private readonly tagModel: typeof Tags,
    @Inject('TASK_REPOSITORY')
    private readonly taskModel: typeof Task,
  ) {}

  //criando uma nova tag
  async create(createTagDto: CreatTagDto) {
     const newTask = await this.tagModel.create(createTagDto as any);
     return newTask
  }

  //encontrando todas as tags
  async findAllTags(): Promise<any> {
    return of(this.tagModel);
  }

  //encontrando uma tag em específico
  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  //atualizando uma tag em específico
  async update(id: number, updateTagDto : UpdateTagDto) {
    const taskCount= await this.taskModel.count({where:{id: updateTagDto.taskId}})
   
    if(taskCount===0)throw new NotFoundException("task don't found")
    const tagCount= await this.tagModel.count({where:{id}})
    if(tagCount===0)throw new NotFoundException("tag don't found")
    await this.tagModel.update(updateTagDto, { where: { id } });
    return {id,...updateTagDto}
  }

  //removendo uma tag em específico
  async remove(id: number) {
    // await this.tagModel.delete(id);
    return `This action removes a #${id} task`;
  }
}
