"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.setGlobalPrefix('api');
        await app.listen(3000);
        console.log('✅ E-Voting System is running on:');
        console.log('   API: http://localhost:3000/api');
        console.log('   Health: http://localhost:3000/api/health');
    }
    catch (error) {
        console.error('❌ Failed to start application:', error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map