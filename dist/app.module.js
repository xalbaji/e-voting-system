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
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const elections_module_1 = require("./elections/elections.module");
const positions_module_1 = require("./positions/positions.module");
const candidates_module_1 = require("./candidates/candidates.module");
const votes_module_1 = require("./votes/votes.module");
const audit_logs_module_1 = require("./audit-logs/audit-logs.module");
const staff_module_1 = require("./staff/staff.module");
const database_config_1 = require("./config/database.config");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot(database_config_1.databaseConfig),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'frontend'),
                serveRoot: '/',
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            elections_module_1.ElectionsModule,
            positions_module_1.PositionsModule,
            candidates_module_1.CandidatesModule,
            votes_module_1.VotesModule,
            audit_logs_module_1.AuditLogsModule,
            staff_module_1.StaffModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map