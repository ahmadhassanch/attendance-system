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

import { CreateUserRoleDto, UpdateUserRoleDto } from './dto';

import { UserRoleEntity } from './entities';

@Injectable()
export class UserRoleService {
  model: string = 'userRole';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto): Promise<UserRoleEntity> {
    const { userId, ...createUserRole } = createUserRoleDto;

    const rec = await this.prisma.userRole.create({
      select: {
        userRoleId: true,
        userId: true,
        role: true,
      },
      data: {
        userRoleId: MakeTimedIDUnique(),
        ...createUserRole,
        user: { connect: { userId: userId } },
      },
    });
    return rec;
  }

  /**
   * Fetch all UserRole containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns UserRole[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserRoleEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.UserRoleWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { userRoleId: { contains: query.search } },
            { userId: { contains: query.search } },
            { role: { contains: query.search } },
            { user: { userId: { contains: query.search } } },
            { user: { username: { contains: query.search } } },
            { user: { email: { contains: query.search } } },
            { user: { mobile: { contains: query.search } } },
            { user: { nic: { contains: query.search } } },
          ]
        : undefined,
    };

    const count: number = await this.prisma.userRole.count({
      where: wh,
    });

    const recs = await this.prisma.userRole.findMany({
      select: {
        userRoleId: true,
        userId: true,
        role: true,
      },
      where: wh,
      skip: offset,
      take: query.per_page,
      orderBy: { userRoleId: Prisma.SortOrder.desc },
    });

    const records = recs.map((rec) => {
      return {
        ...rec,
      };
    });

    const pages = getPages(count, query.per_page);

    return { pages, count, records };
  }

  async findOne(id: string): Promise<UserRoleEntity> {
    const item = await this.prisma.userRole.findUniqueOrThrow({
      select: {
        userRoleId: true,
        userId: true,
        role: true,
      },
      where: {
        userRoleId: id,
      },
    });
    return item;
  }

  async update(
    id: string,
    updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<IDDto> {
    const { ...updateUserRole } = updateUserRoleDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.userRole.update({
        data: {
          ...updateUserRole,
        },
        where: { userRoleId: id },
      }),
    ]);

    return { id: rec.userRoleId };
  }
}
