import { CreateSpeakingTestDto } from './dto/create-speaking-test.dto';
import { updateOnlySpeakingTestDto } from './dto/update-speaking-test.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { FindAllSpeakingTestDto } from './dto/findAll-speaking.test.dto';
import { createOnlySpeakingTestDto } from './dto/create-only-speaking-test.dto';
import { OpenAIService } from '../../openAI/openAI.service';
export declare class SpeakingTestService {
    private readonly prisma;
    private readonly openAIService;
    constructor(prisma: PrismaService, openAIService: OpenAIService);
    convertAudioToText(audioBuffer: Buffer): Promise<string>;
    create(dto: CreateSpeakingTestDto): Promise<{
        sections: ({
            questions: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                questionText: string;
                sectionId: string | null;
                subPartId: string | null;
            }[];
            subParts: ({
                questions: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    order: number;
                    questionText: string;
                    sectionId: string | null;
                    subPartId: string | null;
                }[];
            } & {
                description: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                label: string;
                sectionId: string;
            })[];
            points: {
                type: import(".prisma/client").$Enums.PointType;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                questionText: string;
                sectionId: string;
            }[];
        } & {
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
        })[];
    } & {
        type: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ieltsId: string;
    }>;
    createOnlySpeakingTest(dto: createOnlySpeakingTestDto): Promise<{
        type: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ieltsId: string;
    }>;
    findAll(dto: FindAllSpeakingTestDto): Promise<{
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
                questions: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    order: number;
                    questionText: string;
                    sectionId: string | null;
                    subPartId: string | null;
                }[];
                subParts: ({
                    questions: {
                        id: string;
                        createdAt: Date;
                        updatedAt: Date;
                        order: number;
                        questionText: string;
                        sectionId: string | null;
                        subPartId: string | null;
                    }[];
                } & {
                    description: string | null;
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    label: string;
                    sectionId: string;
                })[];
            } & {
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
            })[];
        } & {
            type: string;
            title: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            ieltsId: string;
        })[];
    }>;
    findAllOnlySpeakingTest(dto: FindAllSpeakingTestDto): Promise<{
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
    findOneOnlySpeakingTest(id: string): Promise<{
        type: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ieltsId: string;
    }>;
    findOne(id: string): Promise<{
        sections: ({
            questions: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                questionText: string;
                sectionId: string | null;
                subPartId: string | null;
            }[];
            subParts: ({
                questions: {
                    id: string;
                    createdAt: Date;
                    updatedAt: Date;
                    order: number;
                    questionText: string;
                    sectionId: string | null;
                    subPartId: string | null;
                }[];
            } & {
                description: string | null;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                label: string;
                sectionId: string;
            })[];
        } & {
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
        })[];
    } & {
        type: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ieltsId: string;
    }>;
    update(id: string, dto: updateOnlySpeakingTestDto): Promise<{
        type: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ieltsId: string;
    }>;
    remove(id: string): Promise<{
        type: string;
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        ieltsId: string;
    }>;
}
