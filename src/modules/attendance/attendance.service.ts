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

import { CreateAttendanceDto, UpdateAttendanceDto } from './dto';

import { AttendanceEntity } from './entities';

@Injectable()
export class AttendanceService {
  model: string = 'attendance';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(
    createAttendanceDto: CreateAttendanceDto,
  ): Promise<AttendanceEntity> {
    const { employeeId, recordTypeId, taskId, ...createAttendance } =
      createAttendanceDto;

    const rec = await this.prisma.attendance.create({
      select: {
        attendanceId: true,
        employeeId: true,
        checkin: true,
        checkout: true,
        recordTypeId: true,
        taskId: true,
      },
      data: {
        attendanceId: MakeTimedIDUnique(),
        ...createAttendance,
        employee: { connect: { employeeId: employeeId } },
        recordType: { connect: { breakTypeId: recordTypeId } },
        task: taskId ? { connect: { taskId: taskId } } : undefined,
      },
    });
    return rec;
  }

  /**
   * Fetch all Attendance containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns Attendance[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<AttendanceEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.AttendanceWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { attendanceId: { contains: query.search } },
            { employeeId: { contains: query.search } },
            { recordTypeId: { contains: query.search } },
            { employee: { employeeId: { contains: query.search } } },
            { employee: { employeeNo: { contains: query.search } } },
            { employee: { userId: { contains: query.search } } },
            { employee: { user: { userId: { contains: query.search } } } },
            { employee: { user: { username: { contains: query.search } } } },
            { employee: { user: { email: { contains: query.search } } } },
            { employee: { user: { mobile: { contains: query.search } } } },
            { employee: { user: { nic: { contains: query.search } } } },
            { employee: { manager: null } },
            {
              employee: { manager: { employeeId: { contains: query.search } } },
            },
            {
              employee: { manager: { employeeNo: { contains: query.search } } },
            },
            { employee: { manager: { userId: { contains: query.search } } } },
            {
              employee: {
                manager: { user: { userId: { contains: query.search } } },
              },
            },
            {
              employee: {
                manager: { user: { username: { contains: query.search } } },
              },
            },
            {
              employee: {
                manager: { user: { email: { contains: query.search } } },
              },
            },
            {
              employee: {
                manager: { user: { mobile: { contains: query.search } } },
              },
            },
            {
              employee: {
                manager: { user: { nic: { contains: query.search } } },
              },
            },
            { employee: { manager: { manager: null } } },
            {
              employee: {
                manager: {
                  manager: { employeeId: { contains: query.search } },
                },
              },
            },
            {
              employee: {
                manager: {
                  manager: { employeeNo: { contains: query.search } },
                },
              },
            },
            {
              employee: {
                manager: { manager: { userId: { contains: query.search } } },
              },
            },
            { employee: { manager: { manager: { manager: null } } } },
            { recordType: { breakTypeId: { contains: query.search } } },
            { task: null },
            { task: { taskId: { contains: query.search } } },
            { task: { taskLead: null } },
            { task: { taskLead: { employeeId: { contains: query.search } } } },
            { task: { taskLead: { employeeNo: { contains: query.search } } } },
            { task: { taskLead: { userId: { contains: query.search } } } },
            {
              task: {
                taskLead: { user: { userId: { contains: query.search } } },
              },
            },
            {
              task: {
                taskLead: { user: { username: { contains: query.search } } },
              },
            },
            {
              task: {
                taskLead: { user: { email: { contains: query.search } } },
              },
            },
            {
              task: {
                taskLead: { user: { mobile: { contains: query.search } } },
              },
            },
            {
              task: { taskLead: { user: { nic: { contains: query.search } } } },
            },
            { task: { taskLead: { manager: null } } },
            {
              task: {
                taskLead: {
                  manager: { employeeId: { contains: query.search } },
                },
              },
            },
            {
              task: {
                taskLead: {
                  manager: { employeeNo: { contains: query.search } },
                },
              },
            },
            {
              task: {
                taskLead: { manager: { userId: { contains: query.search } } },
              },
            },
            { task: { taskLead: { manager: { manager: null } } } },
            { task: { parentTask: null } },
            { task: { parentTask: { taskId: { contains: query.search } } } },
            { task: { parentTask: { taskLead: null } } },
            {
              task: {
                parentTask: {
                  taskLead: { employeeId: { contains: query.search } },
                },
              },
            },
            {
              task: {
                parentTask: {
                  taskLead: { employeeNo: { contains: query.search } },
                },
              },
            },
            {
              task: {
                parentTask: {
                  taskLead: { userId: { contains: query.search } },
                },
              },
            },
            { task: { parentTask: { taskLead: { manager: null } } } },
            { task: { parentTask: { parentTask: null } } },
            {
              task: {
                parentTask: {
                  parentTask: { taskId: { contains: query.search } },
                },
              },
            },
            { task: { parentTask: { parentTask: { taskLead: null } } } },
            { task: { parentTask: { parentTask: { parentTask: null } } } },
          ]
        : undefined,
    };

    const count: number = await this.prisma.attendance.count({
      where: wh,
    });

    const recs = await this.prisma.attendance.findMany({
      select: {
        attendanceId: true,
        employeeId: true,
        checkin: true,
        checkout: true,
        recordTypeId: true,
        taskId: true,
      },
      where: wh,
      skip: offset,
      take: query.per_page,
      orderBy: { attendanceId: Prisma.SortOrder.desc },
    });

    const records = recs.map((rec) => {
      return {
        ...rec,
      };
    });

    const pages = getPages(count, query.per_page);

    return { pages, count, records };
  }

  async findOne(id: string): Promise<AttendanceEntity> {
    const item = await this.prisma.attendance.findUniqueOrThrow({
      select: {
        attendanceId: true,
        employeeId: true,
        checkin: true,
        checkout: true,
        recordTypeId: true,
        taskId: true,
      },
      where: {
        attendanceId: id,
      },
    });
    return item;
  }

  async update(
    id: string,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<IDDto> {
    const { ...updateAttendance } = updateAttendanceDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.attendance.update({
        data: {
          ...updateAttendance,
        },
        where: { attendanceId: id },
      }),
    ]);

    return { id: rec.attendanceId };
  }
}
