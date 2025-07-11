import { CreateOnlySpeakingSectionDto } from './dto/create-speaking-section.dto';
import { UpdateSpeakingSectionDto } from './dto/update-speaking-section.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllSpeakingSectionDto } from './dto/findAll-speaking-section.dto';
export declare class SpeakingSectionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createOnlySpeakingSectionDto: CreateOnlySpeakingSectionDto): Promise<{
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
    update(id: string, dto: UpdateSpeakingSectionDto): Promise<{
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
