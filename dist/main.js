"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("./common/config");
const swagger_1 = require("@nestjs/swagger");
const config_swagger_1 = require("./common/swagger/config.swagger");
const httpException_filter_1 = require("./common/filter/httpException.filter");
const nestedError_1 = require("./common/utils/nestedError");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
        },
    });
    app.setGlobalPrefix('/api');
    app.useGlobalFilters(new httpException_filter_1.HttpExceptionFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: false,
        exceptionFactory: (errors) => {
            const messages = (0, nestedError_1.getValidationErrors)(errors);
            return new common_1.BadRequestException(messages.join(' | '));
        },
    }));
    if (config_1.env.ENV === 'dev') {
        const ApiDocs = swagger_1.SwaggerModule.createDocument(app, config_swagger_1.ApiSwaggerOptions);
        swagger_1.SwaggerModule.setup('docs', app, ApiDocs, {
            customCssUrl: './public/swagger.css',
        });
    }
    await app.listen(config_1.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map