export declare enum SpeakingSectionType {
    PART1 = "PART1",
    PART2 = "PART2",
    PART3 = "PART3"
}
export declare enum SpeakingPointType {
    ADVANTAGE = "ADVANTAGE",
    DISADVANTAGE = "DISADVANTAGE"
}
export declare class CreateSpeakingQuestionDto {
    order: number;
    question: string;
}
export declare class CreateSpeakingPointDto {
    order: number;
    type: SpeakingPointType;
    questionText: string;
}
export declare class CreateSpeakingSubPartDto {
    label: string;
    description?: string;
    questions: CreateSpeakingQuestionDto[];
}
export declare class CreateSpeakingSectionDto {
    order: number;
    type: SpeakingSectionType;
    title?: string;
    description?: string;
    content?: string;
    images?: string[];
    subParts?: CreateSpeakingSubPartDto[];
    questions?: CreateSpeakingQuestionDto[];
    points?: CreateSpeakingPointDto[];
}
export declare class CreateSpeakingTestDto {
    title: string;
    ieltsId: string;
    sections: CreateSpeakingSectionDto[];
}
