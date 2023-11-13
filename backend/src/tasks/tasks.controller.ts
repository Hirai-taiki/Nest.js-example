import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

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
  createTask(
    // @Bodyはリクエストボディのパラメータ
    @Body('title') title: string,
    @Body('description') description: string,
  ): string {
    return `createTask Success! Parameter [title:${title}, description:${description}]`;
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): string {
    return `deleteTask Success! Parameter [id:${id}]`;
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ): string {
    return `updateTask Success! Parameter [id:${id}, status:${status}]`;
  }
}
