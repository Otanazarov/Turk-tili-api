import { QuestionType } from "@prisma/client";
export declare class CreateQuestionDto {
    number: number;
    type: QuestionType;
    text?: string;
    sectionId: string;
}
