import { Body, Controller, Get, Render, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';

import { AppService } from './app.service';

import { AuthService } from './auth/auth.service';
import { Public } from './auth/decorators/jwt-auth.decorator';
import { Roles } from './auth/decorators/roles.decorator';
import { RolesGuards } from './auth/guards/roles.guard';
import { Role } from './auth/role.enum';

@Controller()
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Static view!' };
  }

  @Get('dynamic_render')
  dynamic_render(@Res() res: Response) {
    return res.render(this.appService.getViewName(), {
      message: 'Dynamic view!',
    });
  }

  @Get('hello')
  hello() {
    return 'Ok';
  }

  @Get('health')
  healthCheck() {
    return 'Ok';
  }

  /* This route is protected by Admin role */
  @UseGuards(RolesGuards)
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('checkAuth')
  async authRole() {
    return 'This is access by Admin';
  }

  @Get('call_api')
  call_api() {
    return this.appService.call_api();
  }

  // @Get('test')
  // callReturnEpxiredItems() {
  //   return this.appService.expiredProductsReturnService();
  // }
}
