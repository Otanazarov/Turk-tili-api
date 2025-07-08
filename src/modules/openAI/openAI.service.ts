import { Injectable, OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { env } from 'src/common/config';

export interface IWritingAssessment {
  band: number;
  feedback: {
    taskAchievement: string;
    coherenceAndCohesion: string;
    lexicalResource: string;
    grammaticalRangeAndAccuracy: string;
  };
  suggestion: string;
}

export interface ISpeakingAssessment {
  band: number;
  feedback: {
    fluencyAndCoherence: string;
    lexicalResource: string;
    grammaticalRangeAndAccuracy: string;
    pronunciation: string;
  };
  suggestion: string;
}

@Injectable()
export class OpenAIService implements OnModuleInit {
  public openAI: OpenAI;

  async onModuleInit() {
    this.openAI = new OpenAI({
      apiKey: env.OPEN_AI_API_KEY,
    });
  }

  async createChatCompletion(messages: ChatCompletionMessageParam[]) {
    const completion = await this.openAI.chat.completions.create({
      model: 'gpt-4',
      messages,
    });
    return completion.choices[0].message.content;
  }

  async checkWriting(task: string, essay: string): Promise<IWritingAssessment> {
    const prompt = `
      Task: ${task}
      Essay: ${essay}

      Based on the above IELTS writing task and essay, please provide a detailed assessment.
      I need a band score and feedback on the four criteria:
      1. Task Achievement
      2. Coherence and Cohesion
      3. Lexical Resource
      4. Grammatical Range and Accuracy

      Also, provide a suggestion for improvement.

      Return the response in a JSON object with the following structure:
      {
        "band": <band_score>,
        "feedback": {
          "taskAchievement": "<feedback>",
          "coherenceAndCohesion": "<feedback>",
          "lexicalResource": "<feedback>",
          "grammaticalRangeAndAccuracy": "<feedback>"
        },
        "suggestion": "<suggestion>"
      }
    `;

    const completion = await this.openAI.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return result;
  }

  async checkSpeaking(transcription: string): Promise<ISpeakingAssessment> {
    const prompt = `
      Transcription of user's speaking: ${transcription}

      Based on the provided transcription of an IELTS speaking test, please provide a detailed assessment.
      I need a band score and feedback on the four criteria:
      1. Fluency and Coherence
      2. Lexical Resource
      3. Grammatical Range and Accuracy
      4. Pronunciation (based on the text, infer potential issues if possible, otherwise comment on other aspects)

      Also, provide a suggestion for improvement.

      Return the response in a JSON object with the following structure:
      {
        "band": <band_score>,
        "feedback": {
          "fluencyAndCoherence": "<feedback>",
          "lexicalResource": "<feedback>",
          "grammaticalRangeAndAccuracy": "<feedback>",
          "pronunciation": "<feedback>"
        },
        "suggestion": "<suggestion>"
      }
    `;

    const completion = await this.openAI.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return result;
  }
}
