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

import { CreateUserCodeDto, UpdateUserCodeDto } from './dto';

import { UserCodeEntity } from './entities';

@Injectable()
export class UserCodeService {
  model: string = 'userCode';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(createUserCodeDto: CreateUserCodeDto): Promise<UserCodeEntity> {
    const { userId, ...createUserCode } = createUserCodeDto;

    const rec = await this.prisma.userCode.create({
      select: {
        userCodeId: true,
        codeType: true,
        code: true,
        expiresAt: true,
        appSignature: true,
        userId: true,
        isDeleted: true,
        dateCreated: true,
        dateUpdated: true,
      },
      data: {
        userCodeId: MakeTimedIDUnique(),
        ...createUserCode,
        ...datesForCreate(),
        user: { connect: { userId: userId } },
      },
    });
    return rec;
  }

  /**
   * Fetch all UserCode containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns UserCode[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserCodeEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.UserCodeWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { userCodeId: { contains: query.search } },
            { code: { contains: query.search } },
            { userId: { contains: query.search } },
            { user: { userId: { contains: query.search } } },
            { user: { username: { contains: query.search } } },
            { user: { email: { contains: query.search } } },
            { user: { mobile: { contains: query.search } } },
            { user: { nic: { contains: query.search } } },
          ]
        : undefined,
    };

    const count: number = await this.prisma.userCode.count({
      where: wh,
    });

    const recs = await this.prisma.userCode.findMany({
      select: {
        userCodeId: true,
        codeType: true,
        code: true,
        expiresAt: true,
        appSignature: true,
        userId: true,
        isDeleted: true,
        dateCreated: true,
        dateUpdated: true,
      },
      where: wh,
      skip: offset,
      take: query.per_page,
      orderBy: { dateUpdated: Prisma.SortOrder.desc },
    });

    const records = recs.map((rec) => {
      return {
        ...rec,
      };
    });

    const pages = getPages(count, query.per_page);

    return { pages, count, records };
  }

  async findOne(id: string): Promise<UserCodeEntity> {
    const item = await this.prisma.userCode.findUniqueOrThrow({
      select: {
        userCodeId: true,
        codeType: true,
        code: true,
        expiresAt: true,
        appSignature: true,
        userId: true,
        isDeleted: true,
        dateCreated: true,
        dateUpdated: true,
      },
      where: {
        userCodeId: id,
      },
    });
    return item;
  }

  async update(
    id: string,
    updateUserCodeDto: UpdateUserCodeDto,
  ): Promise<IDDto> {
    const { ...updateUserCode } = updateUserCodeDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.userCode.update({
        data: {
          ...updateUserCode,
          dateUpdated: unixTimestamp(),
        },
        where: { userCodeId: id },
      }),
    ]);

    return { id: rec.userCodeId };
  }
  async remove(id: string) {
    await this.prisma.userCode.update({
      data: { isDeleted: true },
      where: { userCodeId: id },
    });
    return;
  }
}
