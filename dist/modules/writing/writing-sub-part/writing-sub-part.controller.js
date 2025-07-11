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
exports.WritingSubPartController = void 0;
const common_1 = require("@nestjs/common");
const writing_sub_part_service_1 = require("./writing-sub-part.service");
const create_writing_sub_part_dto_1 = require("./dto/create-writing-sub-part.dto");
const update_writing_sub_part_dto_1 = require("./dto/update-writing-sub-part.dto");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const client_1 = require("@prisma/client");
let WritingSubPartController = class WritingSubPartController {
    constructor(writingSubPartService) {
        this.writingSubPartService = writingSubPartService;
    }
    create(createWritingSubPartDto) {
        return this.writingSubPartService.create(createWritingSubPartDto);
    }
    findAll() {
        return this.writingSubPartService.findAll();
    }
    findOne(id) {
        return this.writingSubPartService.findOne(id);
    }
    update(id, updateWritingSubPartDto) {
        return this.writingSubPartService.update(id, updateWritingSubPartDto);
    }
    remove(id) {
        return this.writingSubPartService.remove(id);
    }
};
exports.WritingSubPartController = WritingSubPartController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createWritingSubPart', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_writing_sub_part_dto_1.CreateOnlyWritingSubPartDto]),
    __metadata("design:returntype", void 0)
], WritingSubPartController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAllWritingSubPart'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WritingSubPartController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneWritingSubPart'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WritingSubPartController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateWritingSubPart', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_writing_sub_part_dto_1.UpdateWritingSubPartDto]),
    __metadata("design:returntype", void 0)
], WritingSubPartController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('deleteWritingSubPart', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WritingSubPartController.prototype, "remove", null);
exports.WritingSubPartController = WritingSubPartController = __decorate([
    (0, common_1.Controller)('writing-sub-part'),
    __metadata("design:paramtypes", [writing_sub_part_service_1.WritingSubPartService])
], WritingSubPartController);
//# sourceMappingURL=writing-sub-part.controller.js.map