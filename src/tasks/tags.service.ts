import { Inject, Injectable, NotFoundException} from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreatTagDto } from './dto/create-tags.dto';
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
    return newTask;
  }

  //encontrando todas as tags
  async findAlltag(): Promise<any> {
    return this.tagModel.findAll();
  }

  //encontrando uma tag em específico
  async findOneTag(id: number) {
    const tags= await this.tagModel.findOne({where:{id}})
    if (!tags) throw new NotFoundException("task don't found");
    return tags;
  }

  //atualizando uma tag em específico
  async update(id: number, updateTagDto: UpdateTagDto) {
    const taskCount = await this.taskModel.count({
      where: { id: updateTagDto.taskId },
    });

    if (taskCount === 0) throw new NotFoundException("task don't found");
    await this.checkIfExistsTag(id);
    await this.tagModel.update(updateTagDto, { where: { id } });
    return { id, ...updateTagDto };
  }

  //removendo uma tag em específico
  async remove(id: number) {
   // const tags = await this.t.findOne(id);
   // console.log(tags)
  }
  private async checkIfExistsTag(id: number) {
    const count = await this.tagModel.count({ where: { id } });
    if (count === 0) throw new NotFoundException("task don't found");
  }
}
