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

import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { EmployeeEntity } from './entities';

@Controller('employee')
@ApiBearerAuth()
@ApiTags('Employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiCreatedResponse({ type: EmployeeEntity })
  create(@Body() createServiceDto: CreateEmployeeDto) {
    return this.employeeService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: EmployeeEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.employeeService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: EmployeeEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: EmployeeEntity })
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
