import { BadRequestException, PipeTransform } from '@nestjs/common';

export class TaskStatusPipe implements PipeTransform {
  readonly allowStatus: Array<string> = ['OPEN', 'PROGRESS', 'DONE'];

  transform(value: any): string {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException();
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const result: number = this.allowStatus.indexOf(status);
    return result !== -1;
  }
}
