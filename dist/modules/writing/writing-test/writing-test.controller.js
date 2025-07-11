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
exports.WritingTestController = void 0;
const common_1 = require("@nestjs/common");
const writing_test_service_1 = require("./writing-test.service");
const create_writing_test_dto_1 = require("./dto/create-writing-test.dto");
const update_writing_test_dto_1 = require("./dto/update-writing-test.dto");
const findAll_writingTest_dto_1 = require("./dto/findAll-writingTest.dto");
const swagger_1 = require("@nestjs/swagger");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const client_1 = require("@prisma/client");
let WritingTestController = class WritingTestController {
    constructor(writingTestService) {
        this.writingTestService = writingTestService;
    }
    create(createWritingTestDto) {
        return this.writingTestService.create(createWritingTestDto);
    }
    findAll(dto) {
        return this.writingTestService.findAll(dto);
    }
    findOne(id) {
        return this.writingTestService.findOne(id);
    }
    update(id, updateWritingTestDto) {
        return this.writingTestService.update(id, updateWritingTestDto);
    }
    remove(id) {
        return this.writingTestService.remove(id);
    }
};
exports.WritingTestController = WritingTestController;
__decorate([
    (0, common_1.Post)(),
    (0, decorator_auth_1.DecoratorWrapper)('createWritingTest', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_writing_test_dto_1.CreateWritingTestDto]),
    __metadata("design:returntype", void 0)
], WritingTestController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_writingTest_dto_1.FindAllWritingTestDto]),
    __metadata("design:returntype", void 0)
], WritingTestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WritingTestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateWritingTest', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_writing_test_dto_1.UpdateWritingTestDto]),
    __metadata("design:returntype", void 0)
], WritingTestController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('reomveWritingTest', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WritingTestController.prototype, "remove", null);
exports.WritingTestController = WritingTestController = __decorate([
    (0, common_1.Controller)('writing-test'),
    (0, swagger_1.ApiTags)('WritingTest'),
    __metadata("design:paramtypes", [writing_test_service_1.WritingTestService])
], WritingTestController);
//# sourceMappingURL=writing-test.controller.js.map