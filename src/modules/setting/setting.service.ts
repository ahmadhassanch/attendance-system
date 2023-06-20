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

import { CreateSettingDto, UpdateSettingDto } from './dto';

import { SettingEntity } from './entities';

@Injectable()
export class SettingService {
  model: string = 'setting';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(createSettingDto: CreateSettingDto): Promise<SettingEntity> {
    const { ...createSetting } = createSettingDto;

    const rec = await this.prisma.setting.create({
      select: {
        settingId: true,
        settingName: true,
        settingJson: true,
      },
      data: {
        settingId: MakeTimedIDUnique(),
        ...createSetting,
      },
    });
    return rec;
  }

  /**
   * Fetch all Setting containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns Setting[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<SettingEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.SettingWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { settingId: { contains: query.search } },
            { settingName: { contains: query.search } },
            { settingJson: { contains: query.search } },
          ]
        : undefined,
    };

    const count: number = await this.prisma.setting.count({
      where: wh,
    });

    const recs = await this.prisma.setting.findMany({
      select: {
        settingId: true,
        settingName: true,
        settingJson: true,
      },
      where: wh,
      skip: offset,
      take: query.per_page,
      orderBy: { settingId: Prisma.SortOrder.desc },
    });

    const records = recs.map((rec) => {
      return {
        ...rec,
      };
    });

    const pages = getPages(count, query.per_page);

    return { pages, count, records };
  }

  async findOne(id: string): Promise<SettingEntity> {
    const item = await this.prisma.setting.findUniqueOrThrow({
      select: {
        settingId: true,
        settingName: true,
        settingJson: true,
      },
      where: {
        settingId: id,
      },
    });
    return item;
  }

  async update(id: string, updateSettingDto: UpdateSettingDto): Promise<IDDto> {
    const { ...updateSetting } = updateSettingDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.setting.update({
        data: {
          ...updateSetting,
        },
        where: { settingId: id },
      }),
    ]);

    return { id: rec.settingId };
  }
}
