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

import { SettingService } from './setting.service';
import { CreateSettingDto, UpdateSettingDto } from './dto';
import { SettingEntity } from './entities';

@Controller('setting')
@ApiBearerAuth()
@ApiTags('Setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Post()
  @ApiCreatedResponse({ type: SettingEntity })
  create(@Body() createServiceDto: CreateSettingDto) {
    return this.settingService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: SettingEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.settingService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: SettingEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.settingService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingService.update(id, updateSettingDto);
  }
}
