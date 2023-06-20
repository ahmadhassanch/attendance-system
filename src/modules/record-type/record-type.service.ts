import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CrudService } from 'src/common/crud/crud.service';
import { PRISMA_SERVICE } from 'src/multi-tenant/multi-tenant.module';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  getOffset,
  getPages,
  MakeTimedIDUnique,
  datesForCreate,
  unixTimestamp,
} from 'src/common/common.helper';
import {
  IDDto,
  PaginatedResponseDto,
  PaginationQueryDto,
} from 'src/common/dto';

import { CreateRecordTypeDto, UpdateRecordTypeDto } from './dto';

import { RecordTypeEntity } from './entities';

@Injectable()
export class RecordTypeService {
  model: string = 'recordType';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(
    createRecordTypeDto: CreateRecordTypeDto,
  ): Promise<RecordTypeEntity> {
    const { ...createRecordType } = createRecordTypeDto;

    const rec = await this.prisma.recordType.create({
      select: {
        breakTypeId: true,
        breakName: true,
        breakDescription: true,
      },
      data: {
        breakTypeId: MakeTimedIDUnique(),
        ...createRecordType,
      },
    });
    return rec;
  }

  /**
   * Fetch all RecordType containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns RecordType[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<RecordTypeEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.RecordTypeWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { breakTypeId: { contains: query.search } },
            { breakName: { contains: query.search } },
            { breakDescription: { contains: query.search } },
          ]
        : undefined,
    };

    const count: number = await this.prisma.recordType.count({
      where: wh,
    });

    const recs = await this.prisma.recordType.findMany({
      select: {
        breakTypeId: true,
        breakName: true,
        breakDescription: true,
      },
      where: wh,
      skip: offset,
      take: query.per_page,
      orderBy: { breakTypeId: Prisma.SortOrder.desc },
    });

    const records = recs.map((rec) => {
      return {
        ...rec,
      };
    });

    const pages = getPages(count, query.per_page);

    return { pages, count, records };
  }

  async findOne(id: string): Promise<RecordTypeEntity> {
    const item = await this.prisma.recordType.findUniqueOrThrow({
      select: {
        breakTypeId: true,
        breakName: true,
        breakDescription: true,
      },
      where: {
        breakTypeId: id,
      },
    });
    return item;
  }

  async update(
    id: string,
    updateRecordTypeDto: UpdateRecordTypeDto,
  ): Promise<IDDto> {
    const { ...updateRecordType } = updateRecordTypeDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.recordType.update({
        data: {
          ...updateRecordType,
        },
        where: { breakTypeId: id },
      }),
    ]);

    return { id: rec.breakTypeId };
  }
}
