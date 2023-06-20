import { Controller, Get, Post, Body } from '@nestjs/common';
import { Patch, Param, Delete, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { IDDto, PaginationQueryDto } from 'src/common/dto';
import { ApiPaginatedResponse } from 'src/common/responses';

import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TaskEntity } from './entities';

@Controller('task')
@ApiBearerAuth()
@ApiTags('Task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiCreatedResponse({ type: TaskEntity })
  create(@Body() createServiceDto: CreateTaskDto) {
    return this.taskService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: TaskEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.taskService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: TaskEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }
}
