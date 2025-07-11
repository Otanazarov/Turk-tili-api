import { TestService } from './test.service';
import { FindAllTestDto } from './dto/findAll-test.dto';
import { CreateAllTestDto } from './dto/create-AllTest.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update.test.dto';
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    create(createTestDto: CreateAllTestDto): Promise<{
        parts: ({
            sections: ({
                questions: ({
                    answers: {
                        answer: string | null;
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        questionId: string;
                        variantText: string | null;
                        correct: boolean;
                    }[];
                } & {
                    number: number;
                    type: import(".prisma/client").$Enums.QuestionType;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    sectionId: string;
                    text: string | null;
                })[];
            } & {
                title: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                content: string | null;
                partId: string;
                hasBullets: boolean;
                imageUrl: string | null;
            })[];
        } & {
            number: number;
            description: string | null;
            title: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            audioUrl: string | null;
            testId: string;
        })[];
    } & {
        type: import(".prisma/client").$Enums.TestType;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        adminId: string | null;
        ieltsId: string | null;
    }>;
    createOnlyTest(dto: CreateTestDto): Promise<{
        type: import(".prisma/client").$Enums.TestType;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        adminId: string | null;
        ieltsId: string | null;
    }>;
    findOneTestWithAddition(id: string): Promise<{
        parts: ({
            sections: ({
                questions: ({
                    answers: {
                        answer: string | null;
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        questionId: string;
                        variantText: string | null;
                        correct: boolean;
                    }[];
                } & {
                    number: number;
                    type: import(".prisma/client").$Enums.QuestionType;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    sectionId: string;
                    text: string | null;
                })[];
            } & {
                title: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                content: string | null;
                partId: string;
                hasBullets: boolean;
                imageUrl: string | null;
            })[];
        } & {
            number: number;
            description: string | null;
            title: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            audioUrl: string | null;
            testId: string;
        })[];
    } & {
        type: import(".prisma/client").$Enums.TestType;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        adminId: string | null;
        ieltsId: string | null;
    }>;
    findOneOnlyTest(id: string): Promise<{
        type: import(".prisma/client").$Enums.TestType;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        adminId: string | null;
        ieltsId: string | null;
    }>;
    findAllWithAddition(dto: FindAllTestDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: ({
            parts: ({
                sections: ({
                    questions: ({
                        answers: {
                            answer: string | null;
                            id: string;
                            createdAt: Date;
                            updatedAt: Date;
                            questionId: string;
                            variantText: string | null;
                            correct: boolean;
                        }[];
                    } & {
                        number: number;
                        type: import(".prisma/client").$Enums.QuestionType;
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        sectionId: string;
                        text: string | null;
                    })[];
                } & {
                    title: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    content: string | null;
                    partId: string;
                    hasBullets: boolean;
                    imageUrl: string | null;
                })[];
            } & {
                number: number;
                description: string | null;
                title: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                audioUrl: string | null;
                testId: string;
            })[];
        } & {
            type: import(".prisma/client").$Enums.TestType;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            adminId: string | null;
            ieltsId: string | null;
        })[];
    }>;
    findAllOnly(dto: FindAllTestDto): Promise<{
        total: number;
        page: number;
        limit: number;
        data: {
            type: import(".prisma/client").$Enums.TestType;
            description: string | null;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            adminId: string | null;
            ieltsId: string | null;
        }[];
    }>;
    updateOnlyTest(id: string, dto: UpdateTestDto): Promise<{
        type: import(".prisma/client").$Enums.TestType;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        adminId: string | null;
        ieltsId: string | null;
    }>;
    removeTest(id: string): Promise<{
        type: import(".prisma/client").$Enums.TestType;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        adminId: string | null;
        ieltsId: string | null;
    }>;
    remove(id: string): Promise<{
        type: import(".prisma/client").$Enums.TestType;
        description: string | null;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        adminId: string | null;
        ieltsId: string | null;
    }>;
}
