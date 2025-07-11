import { SpeakingSectionService } from './speaking-section.service';
import { CreateOnlySpeakingSectionDto } from './dto/create-speaking-section.dto';
import { UpdateSpeakingSectionDto } from './dto/update-speaking-section.dto';
import { FindAllSpeakingSectionDto } from './dto/findAll-speaking-section.dto';
export declare class SpeakingSectionController {
    private readonly speakingSectionService;
    constructor(speakingSectionService: SpeakingSectionService);
    create(createSpeakingSectionDto: CreateOnlySpeakingSectionDto): Promise<{
        type: import(".prisma/client").$Enums.SpeakingSectionType;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        order: number;
        images: string[];
        speakingTestId: string;
    }>;
    findAll(dto: FindAllSpeakingSectionDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            type: import(".prisma/client").$Enums.SpeakingSectionType;
            description: string | null;
            title: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string | null;
            order: number;
            images: string[];
            speakingTestId: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        type: import(".prisma/client").$Enums.SpeakingSectionType;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        order: number;
        images: string[];
        speakingTestId: string;
    }>;
    update(id: string, updateSpeakingSectionDto: UpdateSpeakingSectionDto): Promise<{
        type: import(".prisma/client").$Enums.SpeakingSectionType;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        order: number;
        images: string[];
        speakingTestId: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
