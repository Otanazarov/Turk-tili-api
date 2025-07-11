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
exports.CreateSpeakingTestDto = exports.CreateSpeakingSectionDto = exports.CreateSpeakingSubPartDto = exports.CreateSpeakingPointDto = exports.CreateSpeakingQuestionDto = exports.SpeakingPointType = exports.SpeakingSectionType = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
var SpeakingSectionType;
(function (SpeakingSectionType) {
    SpeakingSectionType["PART1"] = "PART1";
    SpeakingSectionType["PART2"] = "PART2";
    SpeakingSectionType["PART3"] = "PART3";
})(SpeakingSectionType || (exports.SpeakingSectionType = SpeakingSectionType = {}));
var SpeakingPointType;
(function (SpeakingPointType) {
    SpeakingPointType["ADVANTAGE"] = "ADVANTAGE";
    SpeakingPointType["DISADVANTAGE"] = "DISADVANTAGE";
})(SpeakingPointType || (exports.SpeakingPointType = SpeakingPointType = {}));
class CreateSpeakingQuestionDto {
}
exports.CreateSpeakingQuestionDto = CreateSpeakingQuestionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSpeakingQuestionDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'What is your name?' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSpeakingQuestionDto.prototype, "question", void 0);
class CreateSpeakingPointDto {
}
exports.CreateSpeakingPointDto = CreateSpeakingPointDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSpeakingPointDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: SpeakingPointType, example: 'ADVANTAGE' }),
    (0, class_validator_1.IsEnum)(SpeakingPointType),
    __metadata("design:type", String)
], CreateSpeakingPointDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'University provides professional skills.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSpeakingPointDto.prototype, "questionText", void 0);
class CreateSpeakingSubPartDto {
}
exports.CreateSpeakingSubPartDto = CreateSpeakingSubPartDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1.1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSpeakingSubPartDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Describe the picture' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpeakingSubPartDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [CreateSpeakingQuestionDto],
        example: [
            {
                order: 1,
                question: 'What is your name?',
            },
        ],
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateSpeakingQuestionDto),
    __metadata("design:type", Array)
], CreateSpeakingSubPartDto.prototype, "questions", void 0);
class CreateSpeakingSectionDto {
}
exports.CreateSpeakingSectionDto = CreateSpeakingSectionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSpeakingSectionDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: SpeakingSectionType, example: 'PART1' }),
    (0, class_validator_1.IsEnum)(SpeakingSectionType),
    __metadata("design:type", String)
], CreateSpeakingSectionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Part 1: Personal questionsss' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpeakingSectionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'You will talk about yourself.' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpeakingSectionDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Savol matni' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSpeakingSectionDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: ['https://cdn.com/part2.jpg'],
        description: 'Rasmlar (faqat PART2 uchun kerak bo‘lishi mumkin)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateSpeakingSectionDto.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [CreateSpeakingSubPartDto],
        description: 'PART1 uchun subPartlar',
        example: [
            {
                label: '1.1',
                description: 'Describe the picture',
                questions: [
                    { order: 1, question: 'What is your name?' },
                    { order: 2, question: 'Do you have pets?' },
                ],
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateSpeakingSubPartDto),
    __metadata("design:type", Array)
], CreateSpeakingSectionDto.prototype, "subParts", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [CreateSpeakingQuestionDto],
        description: 'PART2 yoki PART3 uchun savollar',
        example: [
            {
                order: 1,
                question: 'What do you do?',
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateSpeakingQuestionDto),
    __metadata("design:type", Array)
], CreateSpeakingSectionDto.prototype, "questions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [CreateSpeakingPointDto],
        description: 'PART3 uchun ijobiy va salbiy fikrlar',
        example: [
            {
                order: 1,
                type: 'ADVANTAGE',
                questionText: 'University provides professional skills.',
            },
            {
                order: 2,
                type: 'DISADVANTAGE',
                questionText: 'Not everyone can afford university.',
            },
        ],
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateSpeakingPointDto),
    __metadata("design:type", Array)
], CreateSpeakingSectionDto.prototype, "points", void 0);
class CreateSpeakingTestDto {
}
exports.CreateSpeakingTestDto = CreateSpeakingTestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'IELTS Speaking Test 1' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSpeakingTestDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-ielts-id' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSpeakingTestDto.prototype, "ieltsId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [CreateSpeakingSectionDto],
        description: 'Speaking test qismlari (Part1, Part2, Part3)',
        example: [
            {
                order: 1,
                type: 'PART1',
                title: 'Part 1',
                description: 'Introductory questions',
                content: 'Let’s talk about your home town.',
                images: ['https://cdn.com/image.jpg'],
                subParts: [
                    {
                        label: '1.1',
                        description: 'Describe your room',
                        questions: [
                            { order: 1, question: 'Do you live in a house or an apartment?' },
                            { order: 2, question: 'What do you like about your room?' },
                        ],
                    },
                ],
            },
        ],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateSpeakingSectionDto),
    __metadata("design:type", Array)
], CreateSpeakingTestDto.prototype, "sections", void 0);
//# sourceMappingURL=create-speaking-test.dto.js.map