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
exports.SpeakingPointController = void 0;
const common_1 = require("@nestjs/common");
const speaking_point_service_1 = require("./speaking-point.service");
const create_speaking_point_dto_1 = require("./dto/create-speaking-point.dto");
const update_speaking_point_dto_1 = require("./dto/update-speaking-point.dto");
const findAll_speaking_point_dto_1 = require("./dto/findAll-speaking-point.dto");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const client_1 = require("@prisma/client");
let SpeakingPointController = class SpeakingPointController {
    constructor(speakingPointService) {
        this.speakingPointService = speakingPointService;
    }
    create(createSpeakingPointDto) {
        return this.speakingPointService.create(createSpeakingPointDto);
    }
    findAll(dto) {
        return this.speakingPointService.findAll(dto);
    }
    findOne(id) {
        return this.speakingPointService.findOne(id);
    }
    update(id, updateSpeakingPointDto) {
        return this.speakingPointService.update(id, updateSpeakingPointDto);
    }
    remove(id) {
        return this.speakingPointService.remove(id);
    }
};
exports.SpeakingPointController = SpeakingPointController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createSpeakingPoint', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_speaking_point_dto_1.CreateSpeakingPointDto]),
    __metadata("design:returntype", void 0)
], SpeakingPointController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAllSpeakingPoint'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_speaking_point_dto_1.FindAllSpeakingPointDto]),
    __metadata("design:returntype", void 0)
], SpeakingPointController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneSpeakingPoint'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingPointController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateSpeakingPoint', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_speaking_point_dto_1.UpdateSpeakingPointDto]),
    __metadata("design:returntype", void 0)
], SpeakingPointController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('removeSpeakingPoint', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingPointController.prototype, "remove", null);
exports.SpeakingPointController = SpeakingPointController = __decorate([
    (0, common_1.Controller)('speaking-point'),
    __metadata("design:paramtypes", [speaking_point_service_1.SpeakingPointService])
], SpeakingPointController);
//# sourceMappingURL=speaking-point.controller.js.map