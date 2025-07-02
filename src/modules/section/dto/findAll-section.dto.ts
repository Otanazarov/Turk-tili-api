import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllSectionDto extends PaginationDto {
  @ApiProperty()
  @IsUUID()
  partId: string;
}
