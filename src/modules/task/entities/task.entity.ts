import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsOptional, IsEnum, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class TaskEntity {
  @ApiProperty({
    required: true,
    example: 'taskId',
    description: 'The taskId of the Task',
  })
  @IsString()
  taskId: string;

  @ApiProperty({
    required: true,
    example: 'taskName',
    description: 'The taskName of the Task',
  })
  @IsString()
  taskName: string;

  @ApiProperty({
    required: true,
    example: 'taskDescription',
    description: 'The taskDescription of the Task',
  })
  @IsString()
  taskDescription: string;

  @ApiProperty({
    required: false,
    example: 'taskLeadId',
    description: 'The taskLeadId of the Task',
  })
  @IsOptional()
  @IsString()
  taskLeadId?: string;

  @ApiProperty({
    required: true,
    example: 'WAITING',
    enum: TaskStatus,
    description: 'The taskStatus of the Task',
  })
  @IsEnum(TaskStatus)
  taskStatus: TaskStatus;

  @ApiProperty({
    required: false,
    example: 'parentTaskId',
    description: 'The parentTaskId of the Task',
  })
  @IsOptional()
  @IsString()
  parentTaskId?: string;
}
