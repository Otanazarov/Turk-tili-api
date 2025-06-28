import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { IeltsService } from './ielts.service';
import { CreateIeltsDto } from './dto/create-ielt.dto';
import { UpdateIeltDto } from './dto/update-ielt.dto';
import { ApiTags } from '@nestjs/swagger';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { FindAllIeltsDto } from './dto/findAll-ielts.dto';
import { Role } from '@prisma/client';
@ApiTags('IELTS')
@Controller('ielts')
export class IeltsController {
  constructor(private readonly ieltsService: IeltsService) {}

  @Post()
  @DecoratorWrapper('createIelts', true, [Role.ADMIN])
  create(@Body() createIeltsDto: CreateIeltsDto) {
    return this.ieltsService.create(createIeltsDto);
  }

  @Get()
  @DecoratorWrapper('findAllIelts')
  findAll(@Query() dto: FindAllIeltsDto) {
    return this.ieltsService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOneIelts')
  findOne(@Param('id') id: string) {
    return this.ieltsService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updateIelts', true, [Role.ADMIN])
  update(@Param('id') id: string, @Body() updateIeltDto: UpdateIeltDto) {
    return this.ieltsService.update(id, updateIeltDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removeIelts', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.ieltsService.remove(id);
  }
}
