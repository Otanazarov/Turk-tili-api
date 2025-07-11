import { QuestionType } from '@prisma/client';
export declare class UpdateQuestionDto {
    number?: number;
    type?: QuestionType;
    text?: string;
}
