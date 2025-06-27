import { PartialType } from '@nestjs/swagger';
import { CreateIeltsDto } from './create-ielt.dto';

export class UpdateIeltDto extends PartialType(CreateIeltsDto) {}
