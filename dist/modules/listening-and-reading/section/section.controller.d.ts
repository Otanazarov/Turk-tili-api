import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { FindAllSectionDto } from './dto/findAll-section.dto';
export declare class SectionController {
    private readonly sectionService;
    constructor(sectionService: SectionService);
    create(createSectionDto: CreateSectionDto): Promise<{
        id: string;
        partId: string;
        title: string | null;
        content: string | null;
        hasBullets: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(dto: FindAllSectionDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            id: string;
            partId: string;
            title: string | null;
            content: string | null;
            hasBullets: boolean;
            imageUrl: string | null;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__SectionClient<{
        id: string;
        partId: string;
        title: string | null;
        content: string | null;
        hasBullets: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateSectionDto: UpdateSectionDto): Promise<{
        id: string;
        partId: string;
        title: string | null;
        content: string | null;
        hasBullets: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        partId: string;
        title: string | null;
        content: string | null;
        hasBullets: boolean;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
