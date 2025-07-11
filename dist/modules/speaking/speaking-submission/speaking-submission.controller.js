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
exports.SpeakingSubmissionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const speaking_submission_service_1 = require("./speaking-submission.service");
const create_speaking_submission_dto_1 = require("./dto/create-speaking-submission.dto");
const client_1 = require("@prisma/client");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const findAll_speaking_submission_dto_1 = require("./dto/findAll-speaking.submission.dto");
const update_speaking_submisson_dto_1 = require("./dto/update-speaking-submisson.dto");
const platform_express_1 = require("@nestjs/platform-express");
let SpeakingSubmissionController = class SpeakingSubmissionController {
    constructor(speakingSubmissionService) {
        this.speakingSubmissionService = speakingSubmissionService;
    }
    speechToText(files) {
        return this.speakingSubmissionService.speechToText(files);
    }
    create(createSpeakingSubmissionDto, files, req) {
        const userId = req.user['id'];
        return this.speakingSubmissionService.create(createSpeakingSubmissionDto, files, userId);
    }
    findAll(dto) {
        return this.speakingSubmissionService.findAll(dto);
    }
    findOne(id) {
        return this.speakingSubmissionService.findOne(id);
    }
    update(id, updateSpeakingSubmissionDto) {
        return this.speakingSubmissionService.update(id, updateSpeakingSubmissionDto);
    }
    remove(id) {
        return this.speakingSubmissionService.remove(id);
    }
};
exports.SpeakingSubmissionController = SpeakingSubmissionController;
__decorate([
    (0, common_1.Post)('speech-to-text'),
    (0, decorator_auth_1.DecoratorWrapper)('Speech to text', true, [client_1.Role.USER, client_1.Role.ADMIN]),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], SpeakingSubmissionController.prototype, "speechToText", null);
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('CreateSpeakingSubmission', true, [client_1.Role.USER, client_1.Role.ADMIN]),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_speaking_submission_dto_1.CreateSpeakingSubmissionDto,
        Array, Object]),
    __metadata("design:returntype", void 0)
], SpeakingSubmissionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('FindAllSpeakingSubmissions', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_speaking_submission_dto_1.FindAllSpeakingSubmissionDto]),
    __metadata("design:returntype", void 0)
], SpeakingSubmissionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('FindOneSpeakingSubmission', true, [client_1.Role.USER, client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingSubmissionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('UpdateSpeakingSubmission', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_speaking_submisson_dto_1.UpdateSpeakingSubmissionDto]),
    __metadata("design:returntype", void 0)
], SpeakingSubmissionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('DeleteSpeakingSubmission', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingSubmissionController.prototype, "remove", null);
exports.SpeakingSubmissionController = SpeakingSubmissionController = __decorate([
    (0, swagger_1.ApiTags)('Speaking Submission'),
    (0, common_1.Controller)('speaking-submission'),
    __metadata("design:paramtypes", [speaking_submission_service_1.SpeakingSubmissionService])
], SpeakingSubmissionController);
//# sourceMappingURL=speaking-submission.controller.js.map