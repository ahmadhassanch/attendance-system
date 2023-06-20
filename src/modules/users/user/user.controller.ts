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

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserEntity } from './entities';

@Controller('user')
@ApiBearerAuth()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  create(@Body() createServiceDto: CreateUserDto) {
    return this.userService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: UserEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: UserEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserEntity })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
