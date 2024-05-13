import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { dataSourceOptions } from './dataSource.options';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RBACGuard } from './guards/rbac.guard';
import { HttpExceptionFilter } from './exceptionFilters/response.exception';
import { TokenParse } from './middleware/token-parse.middleware';
import { GameModule } from './game/game.module';
import { GenreModule } from './genre/genre.module';
import { PlatformModule } from './platform/platform.module';

@Module({
  imports: [
    AccountModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: !`.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRATION') }
      })
    }),
    GameModule,
    GenreModule,
    PlatformModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: () => new ValidationPipe({ whitelist: true })
    },
    {
      provide: APP_GUARD,
      useClass: RBACGuard
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(TokenParse)
      .forRoutes('*')
  }
}
