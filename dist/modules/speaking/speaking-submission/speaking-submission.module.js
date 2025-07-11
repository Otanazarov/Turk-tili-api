"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakingSubmissionModule = void 0;
const common_1 = require("@nestjs/common");
const speaking_submission_service_1 = require("./speaking-submission.service");
const speaking_submission_controller_1 = require("./speaking-submission.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const file_module_1 = require("../../file/file.module");
const openAI_module_1 = require("../../openAI/openAI.module");
let SpeakingSubmissionModule = class SpeakingSubmissionModule {
};
exports.SpeakingSubmissionModule = SpeakingSubmissionModule;
exports.SpeakingSubmissionModule = SpeakingSubmissionModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, file_module_1.FileModule, openAI_module_1.OpenAIModule],
        controllers: [speaking_submission_controller_1.SpeakingSubmissionController],
        providers: [speaking_submission_service_1.SpeakingSubmissionService],
    })
], SpeakingSubmissionModule);
//# sourceMappingURL=speaking-submission.module.js.map