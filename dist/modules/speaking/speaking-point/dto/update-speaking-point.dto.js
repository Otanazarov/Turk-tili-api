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
exports.UpdateSpeakingPointDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const create_speaking_test_dto_1 = require("../../speaking-test/dto/create-speaking-test.dto");
class UpdateSpeakingPointDto {
}
exports.UpdateSpeakingPointDto = UpdateSpeakingPointDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateSpeakingPointDto.prototype, "order", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: create_speaking_test_dto_1.SpeakingPointType, example: 'ADVANTAGE' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_speaking_test_dto_1.SpeakingPointType),
    __metadata("design:type", String)
], UpdateSpeakingPointDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Updated point text here' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSpeakingPointDto.prototype, "question", void 0);
//# sourceMappingURL=update-speaking-point.dto.js.map