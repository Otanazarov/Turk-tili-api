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
exports.IeltsController = void 0;
const common_1 = require("@nestjs/common");
const ielts_service_1 = require("./ielts.service");
const create_ielt_dto_1 = require("./dto/create-ielt.dto");
const update_ielt_dto_1 = require("./dto/update-ielt.dto");
const swagger_1 = require("@nestjs/swagger");
const decorator_auth_1 = require("../../common/auth/decorator.auth");
const findAll_ielts_dto_1 = require("./dto/findAll-ielts.dto");
const client_1 = require("@prisma/client");
let IeltsController = class IeltsController {
    constructor(ieltsService) {
        this.ieltsService = ieltsService;
    }
    create(createIeltsDto) {
        return this.ieltsService.create(createIeltsDto);
    }
    findAll(dto) {
        return this.ieltsService.findAll(dto);
    }
    findOne(id) {
        return this.ieltsService.findOne(id);
    }
    update(id, updateIeltDto) {
        return this.ieltsService.update(id, updateIeltDto);
    }
    remove(id) {
        return this.ieltsService.remove(id);
    }
};
exports.IeltsController = IeltsController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createIelts', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ielt_dto_1.CreateIeltsDto]),
    __metadata("design:returntype", void 0)
], IeltsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, decorator_auth_1.DecoratorWrapper)('findAllIelts'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_ielts_dto_1.FindAllIeltsDto]),
    __metadata("design:returntype", void 0)
], IeltsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneIelts'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IeltsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateIelts', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ielt_dto_1.UpdateIeltDto]),
    __metadata("design:returntype", void 0)
], IeltsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('removeIelts', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IeltsController.prototype, "remove", null);
exports.IeltsController = IeltsController = __decorate([
    (0, swagger_1.ApiTags)('IELTS'),
    (0, common_1.Controller)('ielts'),
    __metadata("design:paramtypes", [ielts_service_1.IeltsService])
], IeltsController);
//# sourceMappingURL=ielts.controller.js.map