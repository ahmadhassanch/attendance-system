import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {
    const req: Express.Request = ctx.switchToHttp().getRequest();
    if (key) {
      // @ts-ignore
      return req.user[key];
    }
    return req.user;
  },
);
