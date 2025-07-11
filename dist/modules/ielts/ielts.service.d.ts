import { CreateIeltsDto } from './dto/create-ielt.dto';
import { UpdateIeltDto } from './dto/update-ielt.dto';
import { PrismaService } from '../prisma/prisma.service';
import { FindAllIeltsDto } from './dto/findAll-ielts.dto';
export declare class IeltsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createIeltsDto: CreateIeltsDto): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(dto: FindAllIeltsDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            tests: {
                type: import(".prisma/client").$Enums.TestType;
                description: string | null;
                title: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                ieltsId: string | null;
                adminId: string | null;
            }[];
            WritingTest: {
                type: string;
                title: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                ieltsId: string;
                instruction: string | null;
            }[];
            SpeakingTest: {
                type: string;
                title: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                ieltsId: string;
            }[];
        } & {
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
    }>;
    findOne(id: string): Promise<{
        tests: {
            type: import(".prisma/client").$Enums.TestType;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            ieltsId: string | null;
            adminId: string | null;
        }[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateIeltDto: UpdateIeltDto): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
