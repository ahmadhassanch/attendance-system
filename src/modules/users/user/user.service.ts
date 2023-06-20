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

import { CreateUserDto, UpdateUserDto } from './dto';

import { UserEntity } from './entities';

@Injectable()
export class UserService {
  model: string = 'user';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { ...createUser } = createUserDto;

    const rec = await this.prisma.user.create({
      select: {
        userId: true,
        username: true,
        password: true,
        firstName: true,
        image: true,
        title: true,
        middleName: true,
        lastName: true,
        fullName: true,
        gender: true,
        birthDate: true,
        email: true,
        mobile: true,
        phone: true,
        nic: true,
        address1: true,
        address2: true,
        zipCode: true,
        isActivated: true,
        emailVerified: true,
        phoneVerified: true,
        useTwoFactor: true,
        otpSecret: true,
        emergencyContactPerson: true,
        emergencyContactPhone: true,
        userInt: true,
        userDate: true,
        userString: true,
        userFloat: true,
        isDeleted: true,
        dateCreated: true,
        dateUpdated: true,
      },
      data: {
        userId: MakeTimedIDUnique(),
        ...createUser,
        ...datesForCreate(),
      },
    });
    return rec;
  }

  /**
   * Fetch all User containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns User[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<UserEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.UserWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { userId: { contains: query.search } },
            { username: { contains: query.search } },
            { password: { contains: query.search } },
            { firstName: { contains: query.search } },
            { fullName: { contains: query.search } },
            { email: { contains: query.search } },
            { mobile: { contains: query.search } },
            { nic: { contains: query.search } },
          ]
        : undefined,
    };

    const count: number = await this.prisma.user.count({
      where: wh,
    });

    const recs = await this.prisma.user.findMany({
      select: {
        userId: true,
        username: true,
        password: true,
        firstName: true,
        image: true,
        title: true,
        middleName: true,
        lastName: true,
        fullName: true,
        gender: true,
        birthDate: true,
        email: true,
        mobile: true,
        phone: true,
        nic: true,
        address1: true,
        address2: true,
        zipCode: true,
        isActivated: true,
        emailVerified: true,
        phoneVerified: true,
        useTwoFactor: true,
        otpSecret: true,
        emergencyContactPerson: true,
        emergencyContactPhone: true,
        userInt: true,
        userDate: true,
        userString: true,
        userFloat: true,
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

  async findOne(id: string): Promise<UserEntity> {
    const item = await this.prisma.user.findUniqueOrThrow({
      select: {
        userId: true,
        username: true,
        password: true,
        firstName: true,
        image: true,
        title: true,
        middleName: true,
        lastName: true,
        fullName: true,
        gender: true,
        birthDate: true,
        email: true,
        mobile: true,
        phone: true,
        nic: true,
        address1: true,
        address2: true,
        zipCode: true,
        isActivated: true,
        emailVerified: true,
        phoneVerified: true,
        useTwoFactor: true,
        otpSecret: true,
        emergencyContactPerson: true,
        emergencyContactPhone: true,
        userInt: true,
        userDate: true,
        userString: true,
        userFloat: true,
        isDeleted: true,
        dateCreated: true,
        dateUpdated: true,
      },
      where: {
        userId: id,
      },
    });
    return item;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IDDto> {
    const { ...updateUser } = updateUserDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.user.update({
        data: {
          ...updateUser,
          dateUpdated: unixTimestamp(),
        },
        where: { userId: id },
      }),
    ]);

    return { id: rec.userId };
  }
  async remove(id: string) {
    await this.prisma.user.update({
      data: { isDeleted: true },
      where: { userId: id },
    });
    return;
  }
}
