import { Injectable, OnModuleInit } from '@nestjs/common';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { env } from 'src/common/config';
import { toFile } from 'openai/uploads';

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

@Injectable()
export class OpenAIService implements OnModuleInit {
  public openAI: OpenAI;

  async onModuleInit() {
    this.openAI = new OpenAI({
      apiKey: env.OPEN_AI_API_KEY,
    });
  }

  async speechToText(audioBuffer: Buffer) {
    const transcription = await this.openAI.audio.transcriptions.create({
      file: await toFile(audioBuffer, 'audio.webm'),
      model: 'whisper-1',
    });
    return transcription.text;
  }

  async createChatCompletion(messages: ChatCompletionMessageParam[]) {
    const completion = await this.openAI.chat.completions.create({
      model: 'gpt-4.1-mini',
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
        "score": <band_score>,
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
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return result;
  }

  async getSpeakingAssessment(
    questionsAndAnswers: { question: string; answer: string }[],
  ): Promise<ISpeakingAssessment> {
    const formattedQAs = questionsAndAnswers
      .map(
        (qa, index) =>
          `Question ${index + 1}: ${qa.question}\nAnswer ${index + 1}: ${qa.answer}`,
      )
      .join('\n\n');

    const prompt = `
      Here is a series of questions and answers from an IELTS speaking test:

      ${formattedQAs}

      Based on the entire conversation, please provide a holistic assessment of the user's speaking ability.
      I need an overall band score and detailed feedback on the four criteria:
      1. Fluency and Coherence
      2. Lexical Resource
      3. Grammatical Range and Accuracy
      4. Pronunciation (based on the text, infer potential issues if possible, otherwise comment on other aspects of language use)

      Also, provide a constructive suggestion for improvement.

      Return the response in a single JSON object with the following structure:
      {
        "score": <overall_band_score>,
        "feedback": {
          "fluencyAndCoherence": "<detailed_feedback>",
          "lexicalResource": "<detailed_feedback>",
          "grammaticalRangeAndAccuracy": "<detailed_feedback>",
          "pronunciation": "<detailed_feedback>"
        },
        "suggestion": "<overall_suggestion>"
      }
    `;

    const completion = await this.openAI.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(completion.choices[0].message.content);
    return result;
  }
}
