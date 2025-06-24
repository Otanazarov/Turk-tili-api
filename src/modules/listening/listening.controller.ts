import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Req,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ListeningService } from './listening.service';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';
import { CreateListeningTestDto } from './dto/create-listening-test.dto';
import { FindAllListeningQueryDto } from './dto/findAll-listening-test.dto';
import { UpdateListeningDto } from './dto/update-listening-test.dto';

@Controller('listening')
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Post()
  @DecoratorWrapper('Create Listening')
  create(@Body() createListeningDto: CreateListeningTestDto) {
    return this.listeningService.create(createListeningDto);
  }

  @Get()
  @DecoratorWrapper('Get All Listenings', true, [Role.USER, Role.ADMIN])
  findAll(@Query() query: FindAllListeningQueryDto) {
    return this.listeningService.findAll(query);
  }

  @Get(':id')
  @DecoratorWrapper('Get Listening by ID', true, [Role.USER, Role.ADMIN])
  findOne(@Param('id') id: string) {
    return this.listeningService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('Update Listening', true, [Role.USER])
  update(
    @Param('id') id: string,
    @Body() updateListeningDto: UpdateListeningDto,
  ) {
    return this.listeningService.update(id, updateListeningDto);
  }

  @Delete(':id')
  @DecoratorWrapper('Delete Listening', true, [Role.USER])
  remove(@Param('id') id: string) {
    return this.listeningService.remove(id);
  }
}
