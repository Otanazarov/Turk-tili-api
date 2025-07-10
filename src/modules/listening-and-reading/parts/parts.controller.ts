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
import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { FindAllPartDto } from './dto/findAll-part.dto';
import { DecoratorWrapper } from 'src/common/auth/decorator.auth';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@Controller('parts')
@ApiTags('Reading Or Listening Parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Post()
  @DecoratorWrapper('createPart', true, [Role.ADMIN])
  create(@Body() createPartDto: CreatePartDto) {
    return this.partsService.create(createPartDto);
  }

  @Get()
  @DecoratorWrapper('findAllParts')
  findAll(@Query() dto: FindAllPartDto) {
    return this.partsService.findAll(dto);
  }

  @Get(':id')
  @DecoratorWrapper('findOnePart')
  findOne(@Param('id') id: string) {
    return this.partsService.findOne(id);
  }

  @Patch(':id')
  @DecoratorWrapper('updatePart', true, [Role.ADMIN])
  update(@Param('id') id: string, @Body() updatePartDto: UpdatePartDto) {
    return this.partsService.update(id, updatePartDto);
  }

  @Delete(':id')
  @DecoratorWrapper('removePart', true, [Role.ADMIN])
  remove(@Param('id') id: string) {
    return this.partsService.remove(id);
  }
}
