"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakingModule = void 0;
const common_1 = require("@nestjs/common");
const speaking_point_module_1 = require("./speaking-point/speaking-point.module");
const speaking_question_module_1 = require("./speaking-question/speaking-question.module");
const speaking_section_module_1 = require("./speaking-section/speaking-section.module");
const speaking_sub_part_module_1 = require("./speaking-sub-part/speaking-sub-part.module");
const speaking_test_module_1 = require("./speaking-test/speaking-test.module");
const speaking_submission_module_1 = require("./speaking-submission/speaking-submission.module");
let SpeakingModule = class SpeakingModule {
};
exports.SpeakingModule = SpeakingModule;
exports.SpeakingModule = SpeakingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            speaking_test_module_1.SpeakingTestModule,
            speaking_section_module_1.SpeakingSectionModule,
            speaking_sub_part_module_1.SpeakingSubPartModule,
            speaking_question_module_1.SpeakingQuestionModule,
            speaking_point_module_1.SpeakingPointModule,
            speaking_submission_module_1.SpeakingSubmissionModule,
        ],
    })
], SpeakingModule);
//# sourceMappingURL=speaking.module.js.map