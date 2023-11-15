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
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // @Getとか@PostとかはHTTPリクエストのデコレータ
  @Get()
  getTasks(): Promise<Task[]> {
    return this.tasksService.getTasks();
  }

  // @Paramはリクエストパラメータのデコレータ
  // ParseIntPipeはメソッドに値が引き渡される前に実行され、変換or検証を行う
  // 今回は'id'の変換
  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  // バリデーションパイプの有効化
  @UsePipes(ValidationPipe)
  createTask(
    // @Bodyはリクエストボディのパラメータ
    @Body() taskPropertyDto: TaskPropertyDto,
  ): Promise<Task> {
    return this.tasksService.createTask(taskPropertyDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: string,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, status);
  }
}
