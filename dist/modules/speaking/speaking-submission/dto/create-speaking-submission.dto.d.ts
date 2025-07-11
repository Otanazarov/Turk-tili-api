export declare class AnswerSubmissionDto {
    questionId: string;
}
export declare class CreateSpeakingSubmissionDto {
    speakingTestId: string;
    answers: AnswerSubmissionDto[];
}
