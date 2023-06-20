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

import { UserSessionService } from './user-session.service';
import { CreateUserSessionDto, UpdateUserSessionDto } from './dto';
import { UserSessionEntity } from './entities';

@Controller('user-session')
@ApiBearerAuth()
@ApiTags('UserSession')
export class UserSessionController {
  constructor(private readonly userSessionService: UserSessionService) {}

  @Post()
  @ApiCreatedResponse({ type: UserSessionEntity })
  create(@Body() createServiceDto: CreateUserSessionDto) {
    return this.userSessionService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: UserSessionEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userSessionService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: UserSessionEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSessionService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(
    @Param('id') id: string,
    @Body() updateUserSessionDto: UpdateUserSessionDto,
  ) {
    return this.userSessionService.update(id, updateUserSessionDto);
  }
}
