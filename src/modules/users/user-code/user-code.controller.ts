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

import { UserCodeService } from './user-code.service';
import { CreateUserCodeDto, UpdateUserCodeDto } from './dto';
import { UserCodeEntity } from './entities';

@Controller('user-code')
@ApiBearerAuth()
@ApiTags('UserCode')
export class UserCodeController {
  constructor(private readonly userCodeService: UserCodeService) {}

  @Post()
  @ApiCreatedResponse({ type: UserCodeEntity })
  create(@Body() createServiceDto: CreateUserCodeDto) {
    return this.userCodeService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: UserCodeEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.userCodeService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: UserCodeEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCodeService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(
    @Param('id') id: string,
    @Body() updateUserCodeDto: UpdateUserCodeDto,
  ) {
    return this.userCodeService.update(id, updateUserCodeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: UserCodeEntity })
  remove(@Param('id') id: string) {
    return this.userCodeService.remove(id);
  }
}
