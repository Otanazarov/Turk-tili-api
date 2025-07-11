import { SpeakingSectionType } from '@prisma/client';
export declare class CreateOnlySpeakingSectionDto {
    speakingTestId: string;
    order: number;
    type: SpeakingSectionType;
    title?: string;
    description?: string;
    content?: string;
    images?: string[];
}
