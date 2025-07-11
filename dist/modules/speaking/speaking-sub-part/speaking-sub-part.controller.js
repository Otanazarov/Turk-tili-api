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
exports.SpeakingSubPartController = void 0;
const common_1 = require("@nestjs/common");
const speaking_sub_part_service_1 = require("./speaking-sub-part.service");
const create_speaking_sub_part_dto_1 = require("./dto/create-speaking-sub-part.dto");
const update_speaking_sub_part_dto_1 = require("./dto/update-speaking-sub-part.dto");
const findAll_speaking_sub_part_dto_1 = require("./dto/findAll-speaking-sub-part.dto");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const client_1 = require("@prisma/client");
let SpeakingSubPartController = class SpeakingSubPartController {
    constructor(speakingSubPartService) {
        this.speakingSubPartService = speakingSubPartService;
    }
    create(createSpeakingSubPartDto) {
        return this.speakingSubPartService.create(createSpeakingSubPartDto);
    }
    findAll(dto) {
        return this.speakingSubPartService.findAll(dto);
    }
    findOne(id) {
        return this.speakingSubPartService.findOne(id);
    }
    update(id, updateSpeakingSubPartDto) {
        return this.speakingSubPartService.update(id, updateSpeakingSubPartDto);
    }
    remove(id) {
        return this.speakingSubPartService.remove(id);
    }
};
exports.SpeakingSubPartController = SpeakingSubPartController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createSpeakingSubPart', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_speaking_sub_part_dto_1.CreateSpeakingSubPartDto]),
    __metadata("design:returntype", void 0)
], SpeakingSubPartController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAllSpeakingSubPart'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_speaking_sub_part_dto_1.FindAllSpeakingSubPartDto]),
    __metadata("design:returntype", void 0)
], SpeakingSubPartController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneSpeakingSubPart'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingSubPartController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateSpeakingSubPart', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_speaking_sub_part_dto_1.UpdateSpeakingSubPartDto]),
    __metadata("design:returntype", void 0)
], SpeakingSubPartController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('removeSpeakingSubPart', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SpeakingSubPartController.prototype, "remove", null);
exports.SpeakingSubPartController = SpeakingSubPartController = __decorate([
    (0, common_1.Controller)('speaking-sub-part'),
    __metadata("design:paramtypes", [speaking_sub_part_service_1.SpeakingSubPartService])
], SpeakingSubPartController);
//# sourceMappingURL=speaking-sub-part.controller.js.map