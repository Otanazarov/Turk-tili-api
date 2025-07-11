"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const config_1 = require("../../common/config");
const uploads_1 = require("openai/uploads");
let OpenAIService = class OpenAIService {
    async onModuleInit() {
        this.openAI = new openai_1.default({
            apiKey: config_1.env.OPEN_AI_API_KEY,
        });
    }
    async speechToText(audioBuffer) {
        const transcription = await this.openAI.audio.transcriptions.create({
            file: await (0, uploads_1.toFile)(audioBuffer, 'audio.webm'),
            model: 'whisper-1',
        });
        return transcription.text;
    }
    async createChatCompletion(messages) {
        const completion = await this.openAI.chat.completions.create({
            model: 'gpt-4.1-mini',
            messages,
        });
        return completion.choices[0].message.content;
    }
    async checkWriting(task, essay) {
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
    async getSpeakingAssessment(questionsAndAnswers) {
        const formattedQAs = questionsAndAnswers
            .map((qa, index) => `Question ${index + 1}: ${qa.question}\nAnswer ${index + 1}: ${qa.answer}`)
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
};
exports.OpenAIService = OpenAIService;
exports.OpenAIService = OpenAIService = __decorate([
    (0, common_1.Injectable)()
], OpenAIService);
//# sourceMappingURL=openAI.service.js.map