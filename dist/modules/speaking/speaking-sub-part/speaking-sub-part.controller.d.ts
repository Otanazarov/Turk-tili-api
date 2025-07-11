import { SpeakingSubPartService } from './speaking-sub-part.service';
import { CreateSpeakingSubPartDto } from './dto/create-speaking-sub-part.dto';
import { UpdateSpeakingSubPartDto } from './dto/update-speaking-sub-part.dto';
import { FindAllSpeakingSubPartDto } from './dto/findAll-speaking-sub-part.dto';
export declare class SpeakingSubPartController {
    private readonly speakingSubPartService;
    constructor(speakingSubPartService: SpeakingSubPartService);
    create(createSpeakingSubPartDto: CreateSpeakingSubPartDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        sectionId: string;
    }>;
    findAll(dto: FindAllSpeakingSubPartDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            description: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            label: string;
            sectionId: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        sectionId: string;
    }>;
    update(id: string, updateSpeakingSubPartDto: UpdateSpeakingSubPartDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        label: string;
        sectionId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
