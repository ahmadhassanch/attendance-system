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

import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto, UpdateUserRoleDto } from './dto';
import { UserRoleEntity } from './entities';

@Controller('user-role')
@ApiBearerAuth()
@ApiTags('UserRole')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  @ApiCreatedResponse({ type: UserRoleEntity })
  create(@Body() createServiceDto: CreateUserRoleDto) {
    return this.userRoleService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: UserRoleEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userRoleService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: UserRoleEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(id, updateUserRoleDto);
  }
}
