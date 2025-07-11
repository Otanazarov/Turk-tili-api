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
exports.SpeakingSectionController = void 0;
const common_1 = require("@nestjs/common");
const speaking_section_service_1 = require("./speaking-section.service");
const create_speaking_section_dto_1 = require("./dto/create-speaking-section.dto");
const update_speaking_section_dto_1 = require("./dto/update-speaking-section.dto");
const findAll_speaking_section_dto_1 = require("./dto/findAll-speaking-section.dto");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const client_1 = require("@prisma/client");
let SpeakingSectionController = class SpeakingSectionController {
    constructor(speakingSectionService) {
        this.speakingSectionService = speakingSectionService;
    }
    create(createSpeakingSectionDto) {
        return this.speakingSectionService.create(createSpeakingSectionDto);
    }
    findAll(dto) {
        return this.speakingSectionService.findAll(dto);
    }
    findOne(id) {
        return this.speakingSectionService.findOne(id);
    }
    update(id, updateSpeakingSectionDto) {
        return this.speakingSectionService.update(id, updateSpeakingSectionDto);
    }
    remove(id) {
        return this.speakingSectionService.remove(id);
    }
};
exports.SpeakingSectionController = SpeakingSectionController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createSpeakingSection', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_speaking_section_dto_1.CreateOnlySpeakingSectionDto]),
    __metadata("design:returntype", void 0)
], SpeakingSectionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAllSpeakingSection'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_speaking_section_dto_1.FindAllSpeakingSectionDto]),
    __metadata("design:returntype", void 0)
], SpeakingSectionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneSpeakingSection'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingSectionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateSpeakingSection', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_speaking_section_dto_1.UpdateSpeakingSectionDto]),
    __metadata("design:returntype", void 0)
], SpeakingSectionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('removeSpeakingSection', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingSectionController.prototype, "remove", null);
exports.SpeakingSectionController = SpeakingSectionController = __decorate([
    (0, common_1.Controller)('speaking-section'),
    __metadata("design:paramtypes", [speaking_section_service_1.SpeakingSectionService])
], SpeakingSectionController);
//# sourceMappingURL=speaking-section.controller.js.map