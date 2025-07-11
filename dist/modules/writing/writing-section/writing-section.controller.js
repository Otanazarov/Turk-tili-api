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
exports.WritingSectionController = void 0;
const common_1 = require("@nestjs/common");
const writing_section_service_1 = require("./writing-section.service");
const create_writing_section_dto_1 = require("./dto/create-writing-section.dto");
const update_writing_section_dto_1 = require("./dto/update-writing-section.dto");
const findAll_writing_section_dto_1 = require("./dto/findAll-writing-section.dto");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const client_1 = require("@prisma/client");
let WritingSectionController = class WritingSectionController {
    constructor(writingSectionService) {
        this.writingSectionService = writingSectionService;
    }
    create(createWritingSectionDto) {
        return this.writingSectionService.create(createWritingSectionDto);
    }
    findAll(dto) {
        return this.writingSectionService.findAll(dto);
    }
    findOne(id) {
        return this.writingSectionService.findOne(id);
    }
    update(id, updateWritingSectionDto) {
        return this.writingSectionService.update(id, updateWritingSectionDto);
    }
    remove(id) {
        return this.writingSectionService.remove(id);
    }
};
exports.WritingSectionController = WritingSectionController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createWritingSection', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_writing_section_dto_1.CreateOnlyWritingSectionDto]),
    __metadata("design:returntype", void 0)
], WritingSectionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAllWritingSection'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_writing_section_dto_1.FindAllOnlyWritingSectionDto]),
    __metadata("design:returntype", void 0)
], WritingSectionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneWritingSection'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WritingSectionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateWritingSection', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_writing_section_dto_1.UpdateWritingSectionDto]),
    __metadata("design:returntype", void 0)
], WritingSectionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('deleteWritingSection', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WritingSectionController.prototype, "remove", null);
exports.WritingSectionController = WritingSectionController = __decorate([
    (0, common_1.Controller)('writing-section'),
    __metadata("design:paramtypes", [writing_section_service_1.WritingSectionService])
], WritingSectionController);
//# sourceMappingURL=writing-section.controller.js.map