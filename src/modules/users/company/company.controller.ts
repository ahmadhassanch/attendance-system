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

import { CompanyService } from './company.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto';
import { CompanyEntity } from './entities';

@Controller('company')
@ApiBearerAuth()
@ApiTags('Company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ApiCreatedResponse({ type: CompanyEntity })
  create(@Body() createServiceDto: CreateCompanyDto) {
    return this.companyService.create(createServiceDto);
  }

  @Get()
  @ApiPaginatedResponse({
    type: CompanyEntity,
    status: 200,
  })
  findAll(@Query() paginationQueryDto: PaginationQueryDto) {
    return this.companyService.findAll(paginationQueryDto);
  }

  @ApiOkResponse({ type: CompanyEntity })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: IDDto })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CompanyEntity })
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
