import { WritingSubPartService } from './writing-sub-part.service';
import { CreateOnlyWritingSubPartDto } from './dto/create-writing-sub-part.dto';
import { UpdateWritingSubPartDto } from './dto/update-writing-sub-part.dto';
export declare class WritingSubPartController {
    private readonly writingSubPartService;
    constructor(writingSubPartService: WritingSubPartService);
    create(createWritingSubPartDto: CreateOnlyWritingSubPartDto): Promise<{
        question: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        sectionId: string;
    }>;
    findAll(): Promise<({
        section: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            writingTestId: string;
        };
    } & {
        question: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        sectionId: string;
    })[]>;
    findOne(id: string): Promise<{
        section: {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            writingTestId: string;
        };
    } & {
        question: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        sectionId: string;
    }>;
    update(id: string, updateWritingSubPartDto: UpdateWritingSubPartDto): Promise<{
        question: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        sectionId: string;
    }>;
    remove(id: string): Promise<{
        question: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number;
        label: string;
        sectionId: string;
    }>;
}
