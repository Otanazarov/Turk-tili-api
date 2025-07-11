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
exports.CreateAllTestDto = exports.PartDto = exports.SectionDto = exports.QuestionDto = exports.AnswerDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const client_1 = require("@prisma/client");
class AnswerDto {
}
exports.AnswerDto = AnswerDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'follow me',
        required: false,
        description: 'Answer variant text',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AnswerDto.prototype, "variantText", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'A or apple',
        description: 'Answer text or value',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AnswerDto.prototype, "answer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Is this the correct answer?' }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AnswerDto.prototype, "correct", void 0);
class QuestionDto {
}
exports.QuestionDto = QuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Question number in the section' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.QuestionType,
        example: client_1.QuestionType.MULTIPLE_CHOICE,
        description: 'Type of the question',
    }),
    (0, class_validator_1.IsEnum)(client_1.QuestionType),
    __metadata("design:type", String)
], QuestionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'What do trees produce?',
        description: 'Question text',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QuestionDto.prototype, "text", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [AnswerDto],
        description: 'Answer options for the question',
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AnswerDto),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], QuestionDto.prototype, "answers", void 0);
class SectionDto {
}
exports.SectionDto = SectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Part 1 Section', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SectionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Read the following passage...', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SectionDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'photo.jpg', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SectionDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [QuestionDto],
        description: 'Questions within the section',
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => QuestionDto),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], SectionDto.prototype, "questions", void 0);
class PartDto {
}
exports.PartDto = PartDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Part number (e.g., Part 1, Part 2)',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], PartDto.prototype, "number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://audio-url.mp3', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PartDto.prototype, "audioUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Part 1 description', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PartDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [SectionDto],
        description: 'Sections inside the part',
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SectionDto),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], PartDto.prototype, "sections", void 0);
class CreateAllTestDto {
}
exports.CreateAllTestDto = CreateAllTestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Test 1', description: 'Title of the test' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAllTestDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Listening Test',
        description: 'Description of the test',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAllTestDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.TestType,
        example: client_1.TestType.LISTENING,
        description: 'Test type: LISTENING or READING',
    }),
    (0, class_validator_1.IsEnum)(client_1.TestType),
    __metadata("design:type", String)
], CreateAllTestDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'd1a22aeb-9b4c-4b49-a913-456eef781111',
        description: 'IELTS test group ID',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAllTestDto.prototype, "ieltsId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PartDto],
        description: 'List of parts in the test',
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PartDto),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateAllTestDto.prototype, "parts", void 0);
//# sourceMappingURL=create-AllTest.dto.js.map