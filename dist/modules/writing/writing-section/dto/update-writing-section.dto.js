"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWritingSectionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_writing_section_dto_1 = require("./create-writing-section.dto");
class UpdateWritingSectionDto extends (0, swagger_1.PartialType)(create_writing_section_dto_1.CreateOnlyWritingSectionDto) {
}
exports.UpdateWritingSectionDto = UpdateWritingSectionDto;
//# sourceMappingURL=update-writing-section.dto.js.map