import { WritingTestService } from './writing-test.service';
import { CreateWritingTestDto } from './dto/create-writing-test.dto';
import { UpdateWritingTestDto } from './dto/update-writing-test.dto';
import { FindAllWritingTestDto } from './dto/findAll-writingTest.dto';
export declare class WritingTestController {
    private readonly writingTestService;
    constructor(writingTestService: WritingTestService);
    create(createWritingTestDto: CreateWritingTestDto): Promise<{
        sections: ({
            subParts: {
                question: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                label: string;
                sectionId: string;
            }[];
        } & {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            writingTestId: string;
        })[];
    } & {
        type: string;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ieltsId: string;
        instruction: string | null;
    }>;
    findAll(dto: FindAllWritingTestDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            ielts: {
                title: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
            sections: ({
                subParts: {
                    question: string;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    order: number;
                    label: string;
                    sectionId: string;
                }[];
            } & {
                description: string | null;
                title: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                writingTestId: string;
            })[];
        } & {
            type: string;
            title: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            ieltsId: string;
            instruction: string | null;
        })[];
    }>;
    findOne(id: string): Promise<{
        sections: ({
            subParts: {
                question: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                label: string;
                sectionId: string;
            }[];
        } & {
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            writingTestId: string;
        })[];
    } & {
        type: string;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ieltsId: string;
        instruction: string | null;
    }>;
    update(id: string, updateWritingTestDto: UpdateWritingTestDto): Promise<{
        type: string;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ieltsId: string;
        instruction: string | null;
    }>;
    remove(id: string): Promise<{
        type: string;
        title: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ieltsId: string;
        instruction: string | null;
    }>;
}
