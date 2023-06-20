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

import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';

import { EmployeeEntity } from './entities';

@Injectable()
export class EmployeeService {
  model: string = 'employee';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeEntity> {
    const { managerId, user, ...createEmployee } = createEmployeeDto;

    const rec = await this.prisma.employee.create({
      select: {
        employeeId: true,
        employeeNo: true,
        employeeType: true,
        userId: true,
        managerId: true,
        isDeleted: true,
        dateCreated: true,
        dateUpdated: true,
        user: true,
      },
      data: {
        employeeId: MakeTimedIDUnique(),
        ...createEmployee,
        ...datesForCreate(),
        manager: managerId ? { connect: { employeeId: managerId } } : undefined,
        user: {
          create: {
            userId: MakeTimedIDUnique(),
            ...user,
            ...datesForCreate(),
          },
        },
      },
    });
    return rec;
  }

  /**
   * Fetch all Employee containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns Employee[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<EmployeeEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.EmployeeWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { employeeId: { contains: query.search } },
            { employeeNo: { contains: query.search } },
            { userId: { contains: query.search } },
            { user: { userId: { contains: query.search } } },
            { user: { username: { contains: query.search } } },
            { user: { email: { contains: query.search } } },
            { user: { mobile: { contains: query.search } } },
            { user: { nic: { contains: query.search } } },
            { manager: null },
            { manager: { employeeId: { contains: query.search } } },
            { manager: { employeeNo: { contains: query.search } } },
            { manager: { userId: { contains: query.search } } },
            { manager: { user: { userId: { contains: query.search } } } },
            { manager: { user: { username: { contains: query.search } } } },
            { manager: { user: { email: { contains: query.search } } } },
            { manager: { user: { mobile: { contains: query.search } } } },
            { manager: { user: { nic: { contains: query.search } } } },
            { manager: { manager: null } },
            {
              manager: { manager: { employeeId: { contains: query.search } } },
            },
            {
              manager: { manager: { employeeNo: { contains: query.search } } },
            },
            { manager: { manager: { userId: { contains: query.search } } } },
            {
              manager: {
                manager: { user: { userId: { contains: query.search } } },
              },
            },
            {
              manager: {
                manager: { user: { username: { contains: query.search } } },
              },
            },
            {
              manager: {
                manager: { user: { email: { contains: query.search } } },
              },
            },
            {
              manager: {
                manager: { user: { mobile: { contains: query.search } } },
              },
            },
            {
              manager: {
                manager: { user: { nic: { contains: query.search } } },
              },
            },
            { manager: { manager: { manager: null } } },
            {
              manager: {
                manager: {
                  manager: { employeeId: { contains: query.search } },
                },
              },
            },
            {
              manager: {
                manager: {
                  manager: { employeeNo: { contains: query.search } },
                },
              },
            },
            {
              manager: {
                manager: { manager: { userId: { contains: query.search } } },
              },
            },
            { manager: { manager: { manager: { manager: null } } } },
          ]
        : undefined,
    };

    const count: number = await this.prisma.employee.count({
      where: wh,
    });

    const recs = await this.prisma.employee.findMany({
      select: {
        employeeId: true,
        employeeNo: true,
        employeeType: true,
        userId: true,
        managerId: true,
        isDeleted: true,
        dateCreated: true,
        dateUpdated: true,
        user: true,
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

  async findOne(id: string): Promise<EmployeeEntity> {
    const item = await this.prisma.employee.findUniqueOrThrow({
      select: {
        employeeId: true,
        employeeNo: true,
        employeeType: true,
        userId: true,
        managerId: true,
        isDeleted: true,
        dateCreated: true,
        dateUpdated: true,
        user: true,
      },
      where: {
        employeeId: id,
      },
    });
    return item;
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<IDDto> {
    const { user, ...updateEmployee } = updateEmployeeDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.employee.update({
        data: {
          ...updateEmployee,
          dateUpdated: unixTimestamp(),
        },
        where: { employeeId: id },
      }),
      this.prisma.user.update({
        data: {
          ...user,
          dateUpdated: unixTimestamp(),
        },
        where: { userId: user.userId },
      }),
    ]);

    return { id: rec.employeeId };
  }
  async remove(id: string) {
    await this.prisma.employee.update({
      data: { isDeleted: true },
      where: { employeeId: id },
    });
    return;
  }
}
