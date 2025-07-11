import { OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
export interface IWritingAssessment {
    score: number;
    feedback: {
        taskAchievement: string;
        coherenceAndCohesion: string;
        lexicalResource: string;
        grammaticalRangeAndAccuracy: string;
    };
    suggestion: string;
}
export interface ISpeakingAssessment {
    score: number;
    feedback: {
        fluencyAndCoherence: string;
        lexicalResource: string;
        grammaticalRangeAndAccuracy: string;
        pronunciation: string;
    };
    suggestion: string;
}
export declare class OpenAIService implements OnModuleInit {
    openAI: OpenAI;
    onModuleInit(): Promise<void>;
    speechToText(audioBuffer: Buffer): Promise<string>;
    createChatCompletion(messages: ChatCompletionMessageParam[]): Promise<string>;
    checkWriting(task: string, essay: string): Promise<IWritingAssessment>;
    getSpeakingAssessment(questionsAndAnswers: {
        question: string;
        answer: string;
    }[]): Promise<ISpeakingAssessment>;
}
