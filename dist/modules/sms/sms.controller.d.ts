import { SmsService } from './sms.service';
import { CreateSmsDto } from './dto/create-sms.dto';
export declare class SmsController {
    private readonly smsService;
    constructor(smsService: SmsService);
    create(createSmsDto: CreateSmsDto): Promise<any>;
}
