import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CongeEntity } from 'src/db/entities/conge.entity';
import { PersonelEntity } from 'src/db/personel.entity';
import { CongeController } from './conge.controller';
import { CongeService } from './conge.service';

@Module({
  imports: [TypeOrmModule.forFeature([CongeEntity, PersonelEntity])],
  controllers: [CongeController],
  providers: [CongeService],
})
export class CongeModule {}
