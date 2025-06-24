import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { FindAllFollowDto } from './dto/findAll-follow.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';
import { Request } from 'express';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  @DecoratorWrapper('Create follow', true, [Role.USER])
  create(@Body() createFollowDto: CreateFollowDto, @Req() req: Request) {
    return this.followsService.create(createFollowDto, req.user.id);
  }

  @Get()
  @DecoratorWrapper('FinAll Follow')
  findAll(@Query() dto: FindAllFollowDto) {
    return this.followsService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('FindOne Follow')
  findOne(@Param('id') id: string) {
    return this.followsService.findOne(id);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete Follow', true, [Role.USER])
  remove(@Param('id') followingId: string, @Req() req: Request) {
    return this.followsService.remove(req.user.id, followingId);
  }
}
