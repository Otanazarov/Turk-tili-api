import { TestType, QuestionType } from '@prisma/client';
export declare class AnswerDto {
    variantText?: string;
    answer: string;
    correct: boolean;
}
export declare class QuestionDto {
    number: number;
    type: QuestionType;
    text?: string;
    answers: AnswerDto[];
}
export declare class SectionDto {
    title?: string;
    content?: string;
    imageUrl?: string;
    questions: QuestionDto[];
}
export declare class PartDto {
    number: number;
    audioUrl?: string;
    title?: string;
    sections: SectionDto[];
}
export declare class CreateAllTestDto {
    title?: string;
    description?: string;
    type: TestType;
    ieltsId: string;
    parts: PartDto[];
}
