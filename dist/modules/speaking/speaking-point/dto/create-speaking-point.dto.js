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
exports.CreateSpeakingPointDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_speaking_test_dto_1 = require("../../speaking-test/dto/create-speaking-test.dto");
class CreateSpeakingPointDto {
}
exports.CreateSpeakingPointDto = CreateSpeakingPointDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'uuid-of-speaking-test' }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSpeakingPointDto.prototype, "speakingSectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateSpeakingPointDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: create_speaking_test_dto_1.SpeakingPointType, example: 'ADVANTAGE' }),
    (0, class_validator_1.IsEnum)(create_speaking_test_dto_1.SpeakingPointType),
    __metadata("design:type", String)
], CreateSpeakingPointDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'University provides professional skills.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSpeakingPointDto.prototype, "questionText", void 0);
//# sourceMappingURL=create-speaking-point.dto.js.map