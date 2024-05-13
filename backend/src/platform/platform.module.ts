import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Platform } from './platform.entity';
import { PlatformController } from './platform.controller';
import { PlatformService } from './platform.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Platform])
  ],
  providers: [PlatformService],
  controllers: [PlatformController],
  exports: [TypeOrmModule]
})
export class PlatformModule {}
