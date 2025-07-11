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
exports.SectionController = void 0;
const common_1 = require("@nestjs/common");
const section_service_1 = require("./section.service");
const create_section_dto_1 = require("./dto/create-section.dto");
const update_section_dto_1 = require("./dto/update-section.dto");
const findAll_section_dto_1 = require("./dto/findAll-section.dto");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
let SectionController = class SectionController {
    constructor(sectionService) {
        this.sectionService = sectionService;
    }
    create(createSectionDto) {
        return this.sectionService.createSection(createSectionDto);
    }
    findAll(dto) {
        return this.sectionService.findAll(dto);
    }
    findOne(id) {
        return this.sectionService.findOne(id);
    }
    update(id, updateSectionDto) {
        return this.sectionService.update(id, updateSectionDto);
    }
    remove(id) {
        return this.sectionService.remove(id);
    }
};
exports.SectionController = SectionController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createSection', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_section_dto_1.CreateSectionDto]),
    __metadata("design:returntype", void 0)
], SectionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAllSection'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_section_dto_1.FindAllSectionDto]),
    __metadata("design:returntype", void 0)
], SectionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneSection'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SectionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateSection', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_section_dto_1.UpdateSectionDto]),
    __metadata("design:returntype", void 0)
], SectionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('removeSection', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SectionController.prototype, "remove", null);
exports.SectionController = SectionController = __decorate([
    (0, common_1.Controller)('section'),
    (0, swagger_1.ApiTags)('Reading Or Listening Section for'),
    __metadata("design:paramtypes", [section_service_1.SectionService])
], SectionController);
//# sourceMappingURL=section.controller.js.map