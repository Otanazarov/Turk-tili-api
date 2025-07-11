import { PartsService } from './parts.service';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { FindAllPartDto } from './dto/findAll-part.dto';
export declare class PartsController {
    private readonly partsService;
    constructor(partsService: PartsService);
    create(createPartDto: CreatePartDto): Promise<{
        number: number;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        audioUrl: string | null;
        testId: string;
    }>;
    findAll(dto: FindAllPartDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            number: number;
            description: string | null;
            title: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            audioUrl: string | null;
            testId: string;
        }[];
    }>;
    findOne(id: string): Promise<{
        number: number;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        audioUrl: string | null;
        testId: string;
    }>;
    update(id: string, updatePartDto: UpdatePartDto): Promise<{
        number: number;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        audioUrl: string | null;
        testId: string;
    }>;
    remove(id: string): Promise<{
        number: number;
        description: string | null;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        audioUrl: string | null;
        testId: string;
    }>;
}
