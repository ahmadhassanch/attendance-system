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

import { CreateUserSessionDto, UpdateUserSessionDto } from './dto';

import { UserSessionEntity } from './entities';

@Injectable()
export class UserSessionService {
  model: string = 'userSession';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(
    createUserSessionDto: CreateUserSessionDto,
  ): Promise<UserSessionEntity> {
    const { userId, ...createUserSession } = createUserSessionDto;

    const rec = await this.prisma.userSession.create({
      select: {
        sessionId: true,
        sessionData: true,
        device: true,
        deviceName: true,
        deviceModel: true,
        osName: true,
        osVersion: true,
        userId: true,
      },
      data: {
        sessionId: MakeTimedIDUnique(),
        ...createUserSession,
        user: { connect: { userId: userId } },
      },
    });
    return rec;
  }

  /**
   * Fetch all UserSession containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns UserSession[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserSessionEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.UserSessionWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { sessionId: { contains: query.search } },
            { sessionData: { contains: query.search } },
            { device: { contains: query.search } },
            { userId: { contains: query.search } },
            { user: { userId: { contains: query.search } } },
            { user: { username: { contains: query.search } } },
            { user: { email: { contains: query.search } } },
            { user: { mobile: { contains: query.search } } },
            { user: { nic: { contains: query.search } } },
          ]
        : undefined,
    };

    const count: number = await this.prisma.userSession.count({
      where: wh,
    });

    const recs = await this.prisma.userSession.findMany({
      select: {
        sessionId: true,
        sessionData: true,
        device: true,
        deviceName: true,
        deviceModel: true,
        osName: true,
        osVersion: true,
        userId: true,
      },
      where: wh,
      skip: offset,
      take: query.per_page,
      orderBy: { sessionId: Prisma.SortOrder.desc },
    });

    const records = recs.map((rec) => {
      return {
        ...rec,
      };
    });

    const pages = getPages(count, query.per_page);

    return { pages, count, records };
  }

  async findOne(id: string): Promise<UserSessionEntity> {
    const item = await this.prisma.userSession.findUniqueOrThrow({
      select: {
        sessionId: true,
        sessionData: true,
        device: true,
        deviceName: true,
        deviceModel: true,
        osName: true,
        osVersion: true,
        userId: true,
      },
      where: {
        sessionId: id,
      },
    });
    return item;
  }

  async update(
    id: string,
    updateUserSessionDto: UpdateUserSessionDto,
  ): Promise<IDDto> {
    const { ...updateUserSession } = updateUserSessionDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.userSession.update({
        data: {
          ...updateUserSession,
        },
        where: { sessionId: id },
      }),
    ]);

    return { id: rec.sessionId };
  }
}
