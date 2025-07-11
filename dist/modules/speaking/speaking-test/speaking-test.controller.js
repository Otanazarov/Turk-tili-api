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
exports.SpeakingTestController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const create_only_speaking_test_dto_1 = require("./dto/create-only-speaking-test.dto");
const create_speaking_test_dto_1 = require("./dto/create-speaking-test.dto");
const findAll_speaking_test_dto_1 = require("./dto/findAll-speaking.test.dto");
const update_speaking_test_dto_1 = require("./dto/update-speaking-test.dto");
const speaking_test_service_1 = require("./speaking-test.service");
let SpeakingTestController = class SpeakingTestController {
    constructor(speakingTestService) {
        this.speakingTestService = speakingTestService;
    }
    create(createSpeakingTestDto) {
        return this.speakingTestService.create(createSpeakingTestDto);
    }
    createOnlySpeakingTest(dto) {
        return this.speakingTestService.createOnlySpeakingTest(dto);
    }
    findAll(dto) {
        return this.speakingTestService.findAll(dto);
    }
    async findAllOnlySpeakingTest(dto) {
        return this.speakingTestService.findAllOnlySpeakingTest(dto);
    }
    findOne(id) {
        return this.speakingTestService.findOne(id);
    }
    async FindOneOnlySpeakingTest(id) {
        return this.speakingTestService.findOneOnlySpeakingTest(id);
    }
    update(id, updateSpeakingTestDto) {
        return this.speakingTestService.update(id, updateSpeakingTestDto);
    }
    remove(id) {
        return this.speakingTestService.remove(id);
    }
};
exports.SpeakingTestController = SpeakingTestController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('CreateSpeakingTest', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_speaking_test_dto_1.CreateSpeakingTestDto]),
    __metadata("design:returntype", void 0)
], SpeakingTestController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('only'),
    (0, decorator_auth_1.DecoratorWrapper)('CreateOnlySpeakingTest', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_only_speaking_test_dto_1.createOnlySpeakingTestDto]),
    __metadata("design:returntype", void 0)
], SpeakingTestController.prototype, "createOnlySpeakingTest", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('FindAllSpeakingTest'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_speaking_test_dto_1.FindAllSpeakingTestDto]),
    __metadata("design:returntype", void 0)
], SpeakingTestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('only'),
    (0, decorator_auth_1.DecoratorWrapper)('FindAllOnlySpeakingTest'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_speaking_test_dto_1.FindAllSpeakingTestDto]),
    __metadata("design:returntype", Promise)
], SpeakingTestController.prototype, "findAllOnlySpeakingTest", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('FindOneSpeakingTest'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingTestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('only/:id'),
    (0, decorator_auth_1.DecoratorWrapper)('FindOneOnlySpeakingTest'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpeakingTestController.prototype, "FindOneOnlySpeakingTest", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('UpdateSpeakingTest', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_speaking_test_dto_1.updateOnlySpeakingTestDto]),
    __metadata("design:returntype", void 0)
], SpeakingTestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('FindAllSpeakingTest', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingTestController.prototype, "remove", null);
exports.SpeakingTestController = SpeakingTestController = __decorate([
    (0, swagger_1.ApiTags)('Speaking Test'),
    (0, common_1.Controller)('speaking-test'),
    __metadata("design:paramtypes", [speaking_test_service_1.SpeakingTestService])
], SpeakingTestController);
//# sourceMappingURL=speaking-test.controller.js.map