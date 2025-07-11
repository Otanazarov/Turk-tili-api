"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakingSubPartModule = void 0;
const common_1 = require("@nestjs/common");
const speaking_sub_part_service_1 = require("./speaking-sub-part.service");
const speaking_sub_part_controller_1 = require("./speaking-sub-part.controller");
let SpeakingSubPartModule = class SpeakingSubPartModule {
};
exports.SpeakingSubPartModule = SpeakingSubPartModule;
exports.SpeakingSubPartModule = SpeakingSubPartModule = __decorate([
    (0, common_1.Module)({
        controllers: [speaking_sub_part_controller_1.SpeakingSubPartController],
        providers: [speaking_sub_part_service_1.SpeakingSubPartService],
    })
], SpeakingSubPartModule);
//# sourceMappingURL=speaking-sub-part.module.js.map