import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CongeEntity } from './db/entities/conge.entity';
import { PersonelEntity } from './db/personel.entity';
import { AutorisationEntity } from './db/entities/autorisation.entity';
import { PersonelModule } from './personel/personel.module';
import { AutorisationModule } from './autorisation/autorisation.module';
import { CongeModule } from './conge/conge.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'pfeNes',
      entities: [CongeEntity, PersonelEntity, AutorisationEntity],
      username: 'root',
      synchronize: false,
    }),
    PersonelModule,
    AutorisationModule,
    CongeModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
  async onModuleInit() {
    if (this.connection.isConnected) {
      console.log('connected to nes data base ');
    } else {
      console.log('not connected to  nes data base');
    }
  }
}
