import { ApiProperty } from "@nestjs/swagger";
import { Tags } from "src/tasks/entities/tags.entity";

export class TagsTodoSwagger {
    @ApiProperty({type:Tags, isArray:true})
    taks:Tags[]
}