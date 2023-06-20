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

import { CreateCompanyDto, UpdateCompanyDto } from './dto';

import { CompanyEntity } from './entities';

@Injectable()
export class CompanyService {
  model: string = 'company';

  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaService,
    private readonly crudService: CrudService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
    const { pocId, ...createCompany } = createCompanyDto;

    const rec = await this.prisma.company.create({
      select: {
        companyId: true,
        name: true,
        phone: true,
        email: true,
        fax: true,
        address: true,
        city: true,
        postalCode: true,
        state: true,
        settings: true,
        pocId: true,
        isDeleted: true,
        dateCreated: true,
        dateUpdated: true,
      },
      data: {
        companyId: MakeTimedIDUnique(),
        ...createCompany,
        ...datesForCreate(),
        poc: { connect: { employeeId: pocId } },
      },
    });
    return rec;
  }

  /**
   * Fetch all Company containing searchString in [field1, ].
   *
   * Returns all if searchString is empty.
   *
   * @param searchString
   * @returns Company[]
   */
  async findAll(
    query: PaginationQueryDto,
  ): Promise<PaginatedResponseDto<CompanyEntity>> {
    const offset: number = getOffset(query.page, query.per_page);

    const wh: Prisma.CompanyWhereInput = {
      OR: !(query.search == '' || query.search == 'null')
        ? [
            { companyId: { contains: query.search } },
            { name: { contains: query.search } },
            { phone: { contains: query.search } },
            { address: { contains: query.search } },
            { city: { contains: query.search } },
            { settings: { contains: query.search } },
            { pocId: { contains: query.search } },
            { poc: { employeeId: { contains: query.search } } },
            { poc: { employeeNo: { contains: query.search } } },
            { poc: { userId: { contains: query.search } } },
            { poc: { user: { userId: { contains: query.search } } } },
            { poc: { user: { username: { contains: query.search } } } },
            { poc: { user: { email: { contains: query.search } } } },
            { poc: { user: { mobile: { contains: query.search } } } },
            { poc: { user: { nic: { contains: query.search } } } },
            { poc: { manager: null } },
            { poc: { manager: { employeeId: { contains: query.search } } } },
            { poc: { manager: { employeeNo: { contains: query.search } } } },
            { poc: { manager: { userId: { contains: query.search } } } },
            {
              poc: {
                manager: { user: { userId: { contains: query.search } } },
              },
            },
            {
              poc: {
                manager: { user: { username: { contains: query.search } } },
              },
            },
            {
              poc: { manager: { user: { email: { contains: query.search } } } },
            },
            {
              poc: {
                manager: { user: { mobile: { contains: query.search } } },
              },
            },
            { poc: { manager: { user: { nic: { contains: query.search } } } } },
            { poc: { manager: { manager: null } } },
            {
              poc: {
                manager: {
                  manager: { employeeId: { contains: query.search } },
                },
              },
            },
            {
              poc: {
                manager: {
                  manager: { employeeNo: { contains: query.search } },
                },
              },
            },
            {
              poc: {
                manager: { manager: { userId: { contains: query.search } } },
              },
            },
            { poc: { manager: { manager: { manager: null } } } },
          ]
        : undefined,
    };

    const count: number = await this.prisma.company.count({
      where: wh,
    });

    const recs = await this.prisma.company.findMany({
      select: {
        companyId: true,
        name: true,
        phone: true,
        email: true,
        fax: true,
        address: true,
        city: true,
        postalCode: true,
        state: true,
        settings: true,
        pocId: true,
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

  async findOne(id: string): Promise<CompanyEntity> {
    const item = await this.prisma.company.findUniqueOrThrow({
      select: {
        companyId: true,
        name: true,
        phone: true,
        email: true,
        fax: true,
        address: true,
        city: true,
        postalCode: true,
        state: true,
        settings: true,
        pocId: true,
        isDeleted: true,
        dateCreated: true,
        dateUpdated: true,
      },
      where: {
        companyId: id,
      },
    });
    return item;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<IDDto> {
    const { ...updateCompany } = updateCompanyDto;

    const [rec, ...other] = await this.prisma.$transaction([
      this.prisma.company.update({
        data: {
          ...updateCompany,
          dateUpdated: unixTimestamp(),
        },
        where: { companyId: id },
      }),
    ]);

    return { id: rec.companyId };
  }
  async remove(id: string) {
    await this.prisma.company.update({
      data: { isDeleted: true },
      where: { companyId: id },
    });
    return;
  }
}
