import { PartialType } from '@nestjs/swagger';
import { CreateSpeakingTestDto } from './create-speaking-test.dto';

export class UpdateSpeakingTestDto extends PartialType(CreateSpeakingTestDto) {}
