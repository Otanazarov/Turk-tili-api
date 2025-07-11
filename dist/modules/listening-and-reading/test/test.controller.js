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
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const test_service_1 = require("./test.service");
const findAll_test_dto_1 = require("./dto/findAll-test.dto");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const create_AllTest_dto_1 = require("./dto/create-AllTest.dto");
const create_test_dto_1 = require("./dto/create-test.dto");
const update_test_dto_1 = require("./dto/update.test.dto");
let TestController = class TestController {
    constructor(testService) {
        this.testService = testService;
    }
    create(createTestDto) {
        return this.testService.createTestWithAddition(createTestDto);
    }
    createOnlyTest(dto) {
        return this.testService.createTest(dto);
    }
    findOneTestWithAddition(id) {
        return this.testService.findOneTestWithAddition(id);
    }
    findOneOnlyTest(id) {
        return this.testService.findOneOnlyTest(id);
    }
    findAllWithAddition(dto) {
        return this.testService.findAll(dto);
    }
    findAllOnly(dto) {
        return this.testService.findAllOnlyTest(dto);
    }
    updateOnlyTest(id, dto) {
        return this.testService.updateOnlyTest(id, dto);
    }
    removeTest(id) {
        return this.testService.removeTest(id);
    }
    remove(id) {
        return this.testService.removeOnlyTest(id);
    }
};
exports.TestController = TestController;
__decorate([
    (0, common_1.Post)(''),
    (0, decorator_auth_1.DecoratorWrapper)('createTestWithAddition', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_AllTest_dto_1.CreateAllTestDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('only'),
    (0, decorator_auth_1.DecoratorWrapper)('createOnlyTest', true, [client_1.Role.ADMIN]),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_test_dto_1.CreateTestDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "createOnlyTest", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneTestWithAddition'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "findOneTestWithAddition", null);
__decorate([
    (0, common_1.Get)('only/:id'),
    (0, decorator_auth_1.DecoratorWrapper)('findOneOnlyTest'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "findOneOnlyTest", null);
__decorate([
    (0, common_1.Get)(''),
    (0, decorator_auth_1.DecoratorWrapper)('findAllWithAddition'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_test_dto_1.FindAllTestDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "findAllWithAddition", null);
__decorate([
    (0, common_1.Get)('only'),
    (0, decorator_auth_1.DecoratorWrapper)('findAllOnlyTest'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [findAll_test_dto_1.FindAllTestDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "findAllOnly", null);
__decorate([
    (0, common_1.Patch)('only/:id'),
    (0, decorator_auth_1.DecoratorWrapper)('updateOnlyTest'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_test_dto_1.UpdateTestDto]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "updateOnlyTest", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, decorator_auth_1.DecoratorWrapper)('removeTest'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "removeTest", null);
__decorate([
    (0, common_1.Delete)('only/:id'),
    (0, decorator_auth_1.DecoratorWrapper)('removeOnlyTest'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TestController.prototype, "remove", null);
exports.TestController = TestController = __decorate([
    (0, common_1.Controller)('test'),
    (0, swagger_1.ApiTags)('Reading Or Listening Test'),
    __metadata("design:paramtypes", [test_service_1.TestService])
], TestController);
//# sourceMappingURL=test.controller.js.map