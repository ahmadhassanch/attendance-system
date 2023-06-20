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

import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto, UpdateAttendanceDto } from './dto';
import { AttendanceEntity } from './entities';

@Controller('attendance')
@ApiBearerAuth()
@ApiTags('Attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  @ApiCreatedResponse({ type: AttendanceEntity })
  create(@Body() createServiceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: AttendanceEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.attendanceService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: AttendanceEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.attendanceService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.update(id, updateAttendanceDto);
  }
}
