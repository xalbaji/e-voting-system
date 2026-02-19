import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService} from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

// Entities
import { User } from './users/user.entity';
import { Election } from './elections/election.entity';
import { Position } from './positions/position.entity';
import { Candidate } from './candidates/candidate.entity';
import { Vote } from './votes/vote.entity';
import { AuditLog } from './audit-logs/audit-log.entity';

// Feature modules
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ElectionsModule } from './elections/elections.module';
import { PositionsModule } from './positions/positions.module';
import { CandidatesModule } from './candidates/candidates.module';
import { VotesModule } from './votes/votes.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { StaffModule } from './staff/staff.module';
import { AdminModule } from './admin/admin.module';

// Controllers & services
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElectionsController } from './elections/elections.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env' : '.env.local',
    }),

    // TypeORM setup with SSL for Railway and dev/prod safe options
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('MYSQLHOST'),
        port: parseInt(config.get<string>('MYSQLPORT') || '3306', 10),
        username: config.get<string>('MYSQLUSER'),
        password: config.get<string>('MYSQLPASSWORD'),
        database: config.get<string>('MYSQLDATABASE'),
        entities: [User, Election, Position, Candidate, Vote, AuditLog],
        synchronize: config.get<string>('NODE_ENV') !== 'production',
        logging: true,
        extra: {
          ssl:
            config.get<string>('NODE_ENV') === 'production'
              ? { rejectUnauthorized: false } // accept Railway self-signed cert
              : false,
        },
      }),
    }),

    // Serve static frontend
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'frontend'),
      serveRoot: '/',
      exclude: ['/api*'], 
    }),

    // Feature modules
    UsersModule,
    AuthModule,
    ElectionsModule,
    PositionsModule,
    CandidatesModule,
    VotesModule,
    AuditLogsModule,
    StaffModule,
    AdminModule,
  ],
  controllers: [AppController, ElectionsController],
  providers: [AppService],
})
export class AppModule {}
