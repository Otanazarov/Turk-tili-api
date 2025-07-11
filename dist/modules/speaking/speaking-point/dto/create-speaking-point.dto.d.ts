import { SpeakingPointType } from 'src/modules/speaking/speaking-test/dto/create-speaking-test.dto';
export declare class CreateSpeakingPointDto {
    speakingSectionId: string;
    order: number;
    type: SpeakingPointType;
    questionText: string;
}
