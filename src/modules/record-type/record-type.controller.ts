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

import { RecordTypeService } from './record-type.service';
import { CreateRecordTypeDto, UpdateRecordTypeDto } from './dto';
import { RecordTypeEntity } from './entities';

@Controller('record-type')
@ApiBearerAuth()
@ApiTags('RecordType')
export class RecordTypeController {
  constructor(private readonly recordTypeService: RecordTypeService) {}

  @Post()
  @ApiCreatedResponse({ type: RecordTypeEntity })
  create(@Body() createServiceDto: CreateRecordTypeDto) {
    return this.recordTypeService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: RecordTypeEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.recordTypeService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: RecordTypeEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recordTypeService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(
    @Param('id') id: string,
    @Body() updateRecordTypeDto: UpdateRecordTypeDto,
  ) {
    return this.recordTypeService.update(id, updateRecordTypeDto);
  }
}
