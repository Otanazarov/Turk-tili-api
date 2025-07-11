"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakingTestModule = void 0;
const common_1 = require("@nestjs/common");
const speaking_test_service_1 = require("./speaking-test.service");
const speaking_test_controller_1 = require("./speaking-test.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const openAI_module_1 = require("../../openAI/openAI.module");
let SpeakingTestModule = class SpeakingTestModule {
};
exports.SpeakingTestModule = SpeakingTestModule;
exports.SpeakingTestModule = SpeakingTestModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, openAI_module_1.OpenAIModule],
        controllers: [speaking_test_controller_1.SpeakingTestController],
        providers: [speaking_test_service_1.SpeakingTestService],
    })
], SpeakingTestModule);
//# sourceMappingURL=speaking-test.module.js.map