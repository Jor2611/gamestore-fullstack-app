import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { dataSourceOptions } from './dataSource.options';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
