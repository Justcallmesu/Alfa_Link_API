import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { isValidObjectId } from 'mongoose';
import { ObjectIdParamsDto } from '../dto/Params.dto';

export const ObjectIdParams = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();

    const params = request.params as unknown as ObjectIdParamsDto;

    if (!isValidObjectId(params.id)) {
      throw new BadRequestException('Bad Id Parameters');
    }

    return params.id;
  },
);
