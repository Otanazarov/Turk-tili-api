"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakingQuestionController = void 0;
const common_1 = require("@nestjs/common");
const speaking_question_service_1 = require("./speaking-question.service");
const create_speaking_question_dto_1 = require("./dto/create-speaking-question.dto");
const update_speaking_question_dto_1 = require("./dto/update-speaking-question.dto");
const findAll_speaking_question_dto_1 = require("./dto/findAll-speaking-question.dto");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const client_1 = require("@prisma/client");
const create_sub_part_question_dto_1 = require("./dto/create-sub-part-question.dto");
let SpeakingQuestionController = class SpeakingQuestionController {
    constructor(speakingQuestionService) {
        this.speakingQuestionService = speakingQuestionService;
    }
    create(createSpeakingQuestionDto) {
        return this.speakingQuestionService.createSectionQuestion(createSpeakingQuestionDto);
    }
    createSubPartQuestion(dto) {
        return this.speakingQuestionService.createForSubPart(dto);
    }
    findAll(dto) {
        return this.speakingQuestionService.findAll(dto);
    }
    findOne(id) {
        return this.speakingQuestionService.findOne(id);
    }
    update(id, updateSpeakingQuestionDto) {
        return this.speakingQuestionService.update(id, updateSpeakingQuestionDto);
    }
    remove(id) {
        return this.speakingQuestionService.remove(id);
    }
};
exports.SpeakingQuestionController = SpeakingQuestionController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createSpeakingQuestion', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_speaking_question_dto_1.CreateSpeakingQuestionDto]),
    __metadata("design:returntype", void 0)
], SpeakingQuestionController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/subpart-questions'),
    (0, decorator_auth_1.DecoratorWrapper)('createSubPartQuestion', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sub_part_question_dto_1.CreateSubPartSpeakingQuestionDto]),
    __metadata("design:returntype", void 0)
], SpeakingQuestionController.prototype, "createSubPartQuestion", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAllSpeakingQuestion'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_speaking_question_dto_1.FindAllSpeakingQuestionDto]),
    __metadata("design:returntype", void 0)
], SpeakingQuestionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneSpeakingQuestion'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingQuestionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateSpeakingQuestion', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_speaking_question_dto_1.UpdateSpeakingQuestionDto]),
    __metadata("design:returntype", void 0)
], SpeakingQuestionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('removeSpeakingQuestion', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingQuestionController.prototype, "remove", null);
exports.SpeakingQuestionController = SpeakingQuestionController = __decorate([
    (0, common_1.Controller)('speaking-question'),
    __metadata("design:paramtypes", [speaking_question_service_1.SpeakingQuestionService])
], SpeakingQuestionController);
//# sourceMappingURL=speaking-question.controller.js.map