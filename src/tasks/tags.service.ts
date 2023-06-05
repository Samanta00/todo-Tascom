import { Inject, Injectable, Param } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreatTagDto} from './dto/create-tags.dto';
import { UpdateTag } from './dto/update-tags.dto';
import { of } from 'rxjs';
import { Tags } from './entities/tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @Inject('TAG_REPOSITORY')
    private readonly tagModel: typeof Tags,
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
  findOneTags(id: number) {
    return `This action returns a #${id} task`;
  }

  //atualizando uma tag em específico
  async updateTask(id: number, UpdateTag: CreatTagDto) {
    console.log(`This action updates a #${id} task`);
    return await this.tagModel.update({ id }, { where: { id } });
  }

  //removendo uma tag em específico
  async removeTask(id: number) {
    // await this.tagModel.delete(id);
    return `This action removes a #${id} task`;
  }
}
