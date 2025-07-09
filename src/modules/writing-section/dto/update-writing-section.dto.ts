import { PartialType } from '@nestjs/swagger';
import { CreateOnlyWritingSectionDto } from './create-writing-section.dto';

export class UpdateWritingSectionDto extends PartialType(
  CreateOnlyWritingSectionDto,
) {}
