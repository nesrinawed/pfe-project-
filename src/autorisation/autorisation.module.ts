import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutorisationEntity } from 'src/db/entities/autorisation.entity';
import { PersonelEntity } from 'src/db/personel.entity';
import { AutorisationController } from './autorisation.controller';
import { AutorisationService } from './autorisation.service';

@Module({
  imports: [TypeOrmModule.forFeature([AutorisationEntity, PersonelEntity])],
  controllers: [AutorisationController],
  providers: [AutorisationService],
})
export class AutorisationModule {}
