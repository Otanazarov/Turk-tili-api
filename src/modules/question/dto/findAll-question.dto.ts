import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

export class FindAllquestionDto extends PaginationDto {
  @ApiProperty()
  @IsUUID()
  sectionId: string;
}
