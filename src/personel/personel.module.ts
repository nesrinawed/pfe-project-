import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonelEntity } from 'src/db/personel.entity';
import { PersonelController } from './personel.controller';
import { PersonelService } from './personel.service';

@Module({
  imports: [TypeOrmModule.forFeature([PersonelEntity])],
  controllers: [PersonelController],
  providers: [PersonelService],
})
export class PersonelModule {}
