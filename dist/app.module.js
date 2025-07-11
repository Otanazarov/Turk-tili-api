"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const admin_module_1 = require("./modules/admin/admin.module");
const prisma_module_1 = require("./modules/prisma/prisma.module");
const follows_module_1 = require("./modules/follows/follows.module");
const user_module_1 = require("./modules/user/user.module");
const ielts_module_1 = require("./modules/ielts/ielts.module");
const file_module_1 = require("./modules/file/file.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_module_1 = require("./common/auth/auth.module");
const sms_module_1 = require("./modules/sms/sms.module");
const speaking_module_1 = require("./modules/speaking/speaking.module");
const writing_module_1 = require("./modules/writing/writing.module");
const listening_and_reading_module_1 = require("./modules/listening-and-reading/listening-and-reading.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: '/uploads',
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
            }),
            admin_module_1.AdminModule,
            user_module_1.UserModule,
            ielts_module_1.IeltsModule,
            listening_and_reading_module_1.ListeningAndReadingModule,
            speaking_module_1.SpeakingModule,
            writing_module_1.WritingModule,
            prisma_module_1.PrismaModule,
            file_module_1.FileModule,
            follows_module_1.FollowsModule,
            auth_module_1.AuthModule,
            sms_module_1.SmsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map