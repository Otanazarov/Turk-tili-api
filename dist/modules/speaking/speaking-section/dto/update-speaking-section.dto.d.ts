import { SpeakingSectionType } from '@prisma/client';
export declare class UpdateSpeakingSectionDto {
    order?: number;
    type?: SpeakingSectionType;
    title?: string;
    description?: string;
    content?: string;
    images?: string[];
}
