import { IsName } from 'src/common/dtos/name.dto';
import { IsPassword } from 'src/common/dtos/password.dto';

export class UpdateListeningDto {
  @IsName(false)
  title?: string;
}
