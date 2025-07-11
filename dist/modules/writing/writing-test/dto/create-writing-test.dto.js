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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWritingTestDto = exports.CreateWritingSectionDto = exports.CreateWritingSubPartDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class CreateWritingSubPartDto {
}
exports.CreateWritingSubPartDto = CreateWritingSubPartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateWritingSubPartDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWritingSubPartDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Describe a graph showing population growth.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWritingSubPartDto.prototype, "question", void 0);
class CreateWritingSectionDto {
}
exports.CreateWritingSectionDto = CreateWritingSectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateWritingSectionDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Task 1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWritingSectionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Write a report based on a graph.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWritingSectionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateWritingSubPartDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateWritingSubPartDto),
    __metadata("design:type", Array)
], CreateWritingSectionDto.prototype, "subParts", void 0);
class CreateWritingTestDto {
}
exports.CreateWritingTestDto = CreateWritingTestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IELTS Writing Test 1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWritingTestDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'You have 60 minutes to complete both tasks.',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWritingTestDto.prototype, "instruction", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-ielts-id' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateWritingTestDto.prototype, "ieltsId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CreateWritingSectionDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateWritingSectionDto),
    __metadata("design:type", Array)
], CreateWritingTestDto.prototype, "sections", void 0);
//# sourceMappingURL=create-writing-test.dto.js.map