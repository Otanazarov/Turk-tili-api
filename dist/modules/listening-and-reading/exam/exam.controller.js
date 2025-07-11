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
exports.ExamController = void 0;
const common_1 = require("@nestjs/common");
const exam_service_1 = require("./exam.service");
const decorator_auth_1 = require("../../../common/auth/decorator.auth");
const client_1 = require("@prisma/client");
const submit_test_dto_1 = require("./dto/submit-test.dto");
const swagger_1 = require("@nestjs/swagger");
const user_answer_dto_1 = require("./dto/user-answer.dto");
let ExamController = class ExamController {
    constructor(examService) {
        this.examService = examService;
    }
    submitAll(dto, req) {
        return this.examService.submitAllAnswers(dto, req.user.id);
    }
    async getAllTest() {
        return this.examService.findAllTestResults();
    }
    async getAllUserAnswers(dto) {
        return this.examService.findUserTestAnswers(dto.testResulId);
    }
    async getAllTestResults(req) {
        return this.examService.findOneUserTestResult(req.user.id);
    }
};
exports.ExamController = ExamController;
__decorate([
    (0, common_1.Post)('submit-all'),
    (0, decorator_auth_1.DecoratorWrapper)('submitAllTest', true, [client_1.Role.USER]),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [submit_test_dto_1.SubmitAnswersDto, Object]),
    __metadata("design:returntype", void 0)
], ExamController.prototype, "submitAll", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Get)('all-results'),
    (0, decorator_auth_1.DecoratorWrapper)('getAllTestResults', true, [client_1.Role.ADMIN]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getAllTest", null);
__decorate([
    (0, common_1.Get)('user-answers'),
    (0, decorator_auth_1.DecoratorWrapper)('getAllUserAnswers'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_answer_dto_1.UserAnswerDto]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getAllUserAnswers", null);
__decorate([
    (0, common_1.Get)('result'),
    (0, decorator_auth_1.DecoratorWrapper)('getOneUserTestResults', true, [client_1.Role.USER]),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ExamController.prototype, "getAllTestResults", null);
exports.ExamController = ExamController = __decorate([
    (0, common_1.Controller)('exam'),
    (0, swagger_1.ApiTags)('Reading Or Listening Exam yani Test topshirishi'),
    __metadata("design:paramtypes", [exam_service_1.ExamService])
], ExamController);
//# sourceMappingURL=exam.controller.js.map