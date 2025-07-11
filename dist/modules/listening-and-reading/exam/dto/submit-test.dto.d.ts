export declare class SubmitAnswerDto {
    questionId: string;
    userAnswer: string | string[];
}
export declare class SubmitAnswersDto {
    testId?: string;
    answers: SubmitAnswerDto[];
}
