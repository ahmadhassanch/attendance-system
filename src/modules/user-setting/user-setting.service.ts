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

import { CreateUserSettingDto, UpdateUserSettingDto } from './dto';

import { UserSettingEntity } from './entities';

@Injectable()
export class UserSettingService {
  model: string = 'userSetting';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(
    createUserSettingDto: CreateUserSettingDto,
  ): Promise<UserSettingEntity> {
    const { userId, ...createUserSetting } = createUserSettingDto;

    const rec = await this.prisma.userSetting.create({
      select: {
        userSettingId: true,
        notify: true,
        language: true,
        userId: true,
        userSettingJson: true,
      },
      data: {
        userSettingId: MakeTimedIDUnique(),
        ...createUserSetting,
        user: { connect: { userId: userId } },
      },
    });
    return rec;
  }

  /**
   * Fetch all UserSetting containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns UserSetting[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserSettingEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.UserSettingWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { userSettingId: { contains: query.search } },
            { userId: { contains: query.search } },
            { userSettingJson: { contains: query.search } },
            { user: { userId: { contains: query.search } } },
            { user: { username: { contains: query.search } } },
            { user: { email: { contains: query.search } } },
            { user: { mobile: { contains: query.search } } },
            { user: { nic: { contains: query.search } } },
          ]
        : undefined,
    };

    const count: number = await this.prisma.userSetting.count({
      where: wh,
    });

    const recs = await this.prisma.userSetting.findMany({
      select: {
        userSettingId: true,
        notify: true,
        language: true,
        userId: true,
        userSettingJson: true,
      },
      where: wh,
      skip: offset,
      take: query.per_page,
      orderBy: { userSettingId: Prisma.SortOrder.desc },
    });

    const records = recs.map((rec) => {
      return {
        ...rec,
      };
    });

    const pages = getPages(count, query.per_page);

    return { pages, count, records };
  }

  async findOne(id: string): Promise<UserSettingEntity> {
    const item = await this.prisma.userSetting.findUniqueOrThrow({
      select: {
        userSettingId: true,
        notify: true,
        language: true,
        userId: true,
        userSettingJson: true,
      },
      where: {
        userSettingId: id,
      },
    });
    return item;
  }

  async update(
    id: string,
    updateUserSettingDto: UpdateUserSettingDto,
  ): Promise<IDDto> {
    const { ...updateUserSetting } = updateUserSettingDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.userSetting.update({
        data: {
          ...updateUserSetting,
        },
        where: { userSettingId: id },
      }),
    ]);

    return { id: rec.userSettingId };
  }
}
