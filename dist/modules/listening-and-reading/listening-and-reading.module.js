"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListeningAndReadingModule = void 0;
const common_1 = require("@nestjs/common");
const answer_module_1 = require("./answer/answer.module");
const exam_module_1 = require("./exam/exam.module");
const parts_module_1 = require("./parts/parts.module");
const question_module_1 = require("./question/question.module");
const section_module_1 = require("./section/section.module");
const test_module_1 = require("./test/test.module");
let ListeningAndReadingModule = class ListeningAndReadingModule {
};
exports.ListeningAndReadingModule = ListeningAndReadingModule;
exports.ListeningAndReadingModule = ListeningAndReadingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            test_module_1.TestModule,
            parts_module_1.PartsModule,
            section_module_1.SectionModule,
            question_module_1.QuestionModule,
            answer_module_1.AnswerModule,
            exam_module_1.ExamModule,
        ],
    })
], ListeningAndReadingModule);
//# sourceMappingURL=listening-and-reading.module.js.map