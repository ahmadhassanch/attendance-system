import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IsChiString } from '../decorators/is-chi-string.decorator';

export class PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ required: false })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({ required: false })
  per_page?: number = 30;

  @IsString({})
  @IsOptional()
  @ApiProperty({ required: false })
  search?: string = '';

  @IsString({})
  @IsOptional()
  @ApiProperty({ required: false })
  is_active?: string = '';
}

export class NonPaginationQueryDto {
  @IsString({})
  @IsOptional()
  @ApiProperty({ required: false })
  search?: string = '';

  @IsString({})
  @IsOptional()
  @ApiProperty({ required: false })
  is_active?: string = '';
}
