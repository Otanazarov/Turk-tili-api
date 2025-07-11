import { SpeakingPointService } from './speaking-point.service';
import { CreateSpeakingPointDto } from './dto/create-speaking-point.dto';
import { UpdateSpeakingPointDto } from './dto/update-speaking-point.dto';
import { FindAllSpeakingPointDto } from './dto/findAll-speaking-point.dto';
export declare class SpeakingPointController {
    private readonly speakingPointService;
    constructor(speakingPointService: SpeakingPointService);
    create(createSpeakingPointDto: CreateSpeakingPointDto): Promise<{
        type: import(".prisma/client").$Enums.PointType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        questionText: string;
        sectionId: string;
    }>;
    findAll(dto: FindAllSpeakingPointDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            type: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            ieltsId: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        type: import(".prisma/client").$Enums.PointType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        questionText: string;
        sectionId: string;
    }>;
    update(id: string, updateSpeakingPointDto: UpdateSpeakingPointDto): Promise<{
        type: import(".prisma/client").$Enums.PointType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        questionText: string;
        sectionId: string;
    }>;
    remove(id: string): Promise<{
        type: import(".prisma/client").$Enums.PointType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        questionText: string;
        sectionId: string;
    }>;
}
