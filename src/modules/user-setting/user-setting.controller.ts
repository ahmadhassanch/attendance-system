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

import { UserSettingService } from './user-setting.service';
import { CreateUserSettingDto, UpdateUserSettingDto } from './dto';
import { UserSettingEntity } from './entities';

@Controller('user-setting')
@ApiBearerAuth()
@ApiTags('UserSetting')
export class UserSettingController {
  constructor(private readonly userSettingService: UserSettingService) {}

  @Post()
  @ApiCreatedResponse({ type: UserSettingEntity })
  create(@Body() createServiceDto: CreateUserSettingDto) {
    return this.userSettingService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: UserSettingEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userSettingService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: UserSettingEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSettingService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(
    @Param('id') id: string,
    @Body() updateUserSettingDto: UpdateUserSettingDto,
  ) {
    return this.userSettingService.update(id, updateUserSettingDto);
  }
}
