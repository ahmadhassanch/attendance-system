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

import { CreateTaskDto, UpdateTaskDto } from './dto';

import { TaskEntity } from './entities';

@Injectable()
export class TaskService {
  model: string = 'task';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskEntity> {
    const { taskLeadId, parentTaskId, ...createTask } = createTaskDto;

    const rec = await this.prisma.task.create({
      select: {
        taskId: true,
        taskName: true,
        taskDescription: true,
        taskLeadId: true,
        taskStatus: true,
        parentTaskId: true,
      },
      data: {
        taskId: MakeTimedIDUnique(),
        ...createTask,
        taskLead: taskLeadId
          ? { connect: { employeeId: taskLeadId } }
          : undefined,
        parentTask: parentTaskId
          ? { connect: { taskId: parentTaskId } }
          : undefined,
      },
    });
    return rec;
  }

  /**
   * Fetch all Task containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns Task[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<TaskEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.TaskWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { taskId: { contains: query.search } },
            { taskName: { contains: query.search } },
            { taskDescription: { contains: query.search } },
            { taskLead: null },
            { taskLead: { employeeId: { contains: query.search } } },
            { taskLead: { employeeNo: { contains: query.search } } },
            { taskLead: { userId: { contains: query.search } } },
            { taskLead: { user: { userId: { contains: query.search } } } },
            { taskLead: { user: { username: { contains: query.search } } } },
            { taskLead: { user: { email: { contains: query.search } } } },
            { taskLead: { user: { mobile: { contains: query.search } } } },
            { taskLead: { user: { nic: { contains: query.search } } } },
            { taskLead: { manager: null } },
            {
              taskLead: { manager: { employeeId: { contains: query.search } } },
            },
            {
              taskLead: { manager: { employeeNo: { contains: query.search } } },
            },
            { taskLead: { manager: { userId: { contains: query.search } } } },
            {
              taskLead: {
                manager: { user: { userId: { contains: query.search } } },
              },
            },
            {
              taskLead: {
                manager: { user: { username: { contains: query.search } } },
              },
            },
            {
              taskLead: {
                manager: { user: { email: { contains: query.search } } },
              },
            },
            {
              taskLead: {
                manager: { user: { mobile: { contains: query.search } } },
              },
            },
            {
              taskLead: {
                manager: { user: { nic: { contains: query.search } } },
              },
            },
            { taskLead: { manager: { manager: null } } },
            {
              taskLead: {
                manager: {
                  manager: { employeeId: { contains: query.search } },
                },
              },
            },
            {
              taskLead: {
                manager: {
                  manager: { employeeNo: { contains: query.search } },
                },
              },
            },
            {
              taskLead: {
                manager: { manager: { userId: { contains: query.search } } },
              },
            },
            { taskLead: { manager: { manager: { manager: null } } } },
            { parentTask: null },
            { parentTask: { taskId: { contains: query.search } } },
            { parentTask: { taskLead: null } },
            {
              parentTask: {
                taskLead: { employeeId: { contains: query.search } },
              },
            },
            {
              parentTask: {
                taskLead: { employeeNo: { contains: query.search } },
              },
            },
            {
              parentTask: { taskLead: { userId: { contains: query.search } } },
            },
            {
              parentTask: {
                taskLead: { user: { userId: { contains: query.search } } },
              },
            },
            {
              parentTask: {
                taskLead: { user: { username: { contains: query.search } } },
              },
            },
            {
              parentTask: {
                taskLead: { user: { email: { contains: query.search } } },
              },
            },
            {
              parentTask: {
                taskLead: { user: { mobile: { contains: query.search } } },
              },
            },
            {
              parentTask: {
                taskLead: { user: { nic: { contains: query.search } } },
              },
            },
            { parentTask: { taskLead: { manager: null } } },
            {
              parentTask: {
                taskLead: {
                  manager: { employeeId: { contains: query.search } },
                },
              },
            },
            {
              parentTask: {
                taskLead: {
                  manager: { employeeNo: { contains: query.search } },
                },
              },
            },
            {
              parentTask: {
                taskLead: { manager: { userId: { contains: query.search } } },
              },
            },
            { parentTask: { taskLead: { manager: { manager: null } } } },
            { parentTask: { parentTask: null } },
            {
              parentTask: {
                parentTask: { taskId: { contains: query.search } },
              },
            },
            { parentTask: { parentTask: { taskLead: null } } },
            {
              parentTask: {
                parentTask: {
                  taskLead: { employeeId: { contains: query.search } },
                },
              },
            },
            {
              parentTask: {
                parentTask: {
                  taskLead: { employeeNo: { contains: query.search } },
                },
              },
            },
            {
              parentTask: {
                parentTask: {
                  taskLead: { userId: { contains: query.search } },
                },
              },
            },
            { parentTask: { parentTask: { taskLead: { manager: null } } } },
            { parentTask: { parentTask: { parentTask: null } } },
            {
              parentTask: {
                parentTask: {
                  parentTask: { taskId: { contains: query.search } },
                },
              },
            },
            { parentTask: { parentTask: { parentTask: { taskLead: null } } } },
            {
              parentTask: { parentTask: { parentTask: { parentTask: null } } },
            },
          ]
        : undefined,
    };

    const count: number = await this.prisma.task.count({
      where: wh,
    });

    const recs = await this.prisma.task.findMany({
      select: {
        taskId: true,
        taskName: true,
        taskDescription: true,
        taskLeadId: true,
        taskStatus: true,
        parentTaskId: true,
      },
      where: wh,
      skip: offset,
      take: query.per_page,
      orderBy: { taskId: Prisma.SortOrder.desc },
    });

    const records = recs.map((rec) => {
      return {
        ...rec,
      };
    });

    const pages = getPages(count, query.per_page);

    return { pages, count, records };
  }

  async findOne(id: string): Promise<TaskEntity> {
    const item = await this.prisma.task.findUniqueOrThrow({
      select: {
        taskId: true,
        taskName: true,
        taskDescription: true,
        taskLeadId: true,
        taskStatus: true,
        parentTaskId: true,
      },
      where: {
        taskId: id,
      },
    });
    return item;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<IDDto> {
    const { ...updateTask } = updateTaskDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.task.update({
        data: {
          ...updateTask,
        },
        where: { taskId: id },
      }),
    ]);

    return { id: rec.taskId };
  }
}
