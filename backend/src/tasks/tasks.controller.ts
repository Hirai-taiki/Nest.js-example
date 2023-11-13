import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskPropertyDto } from './dto/task-property.dto';
import { TaskStatusPipe } from './pipe/task-status.pipe';

@Controller('tasks')
export class TasksController {
  // @Getとか@PostとかはHTTPリクエストのデコレータ
  @Get()
  getTasks(): string {
    return 'getTasks Success!';
  }

  // @Paramはリクエストパラメータのデコレータ
  // ParseIntPipeはメソッドに値が引き渡される前に実行され、変換or検証を行う
  // 今回は'id'の変換
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): string {
    return `getTaskById Success! Parameter [id:${id}]`;
  }

  @Post()
  // バリデーションパイプの有効化
  @UsePipes(ValidationPipe)
  createTask(
    // @Bodyはリクエストボディのパラメータ
    @Body() taskPropertyDto: TaskPropertyDto,
  ): string {
    const { title, description } = taskPropertyDto;
    return `createTask Success! Parameter [title:${title}, description:${description}]`;
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): string {
    return `deleteTask Success! Parameter [id:${id}]`;
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: string,
  ): string {
    return `updateTask Success! Parameter [id:${id}, status:${status}]`;
  }
}
