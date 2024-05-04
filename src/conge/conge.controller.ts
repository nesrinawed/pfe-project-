import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CongeService } from './conge.service';

@Controller('conge')
export class CongeController {
  constructor(private readonly congeService: CongeService) {}
  //deposer un conge  :
  @Post(':idPersonle')
  async deposerConge(@Body() Body, @Param('idPersonel') idPersonel: number) {
    console.log(Body);
    const { leaveType, startDate, endDate, raisonConge } = Body;
    return this.congeService.deposerConge(
      leaveType,
      startDate,
      endDate,
      raisonConge,
      idPersonel,
    );
  }

  //get tous les conge  :
  @Get()
  async getAllAutorisation() {
    return await this.congeService.getAllConge();
  }

  //accepter un conge  :
  @Put('accepterConge/:id')
  async accepterConge(@Param('id') id: number) {
    return await this.congeService.accepterConge(id);
  }

  //valider conge   :
  @Put('validerConge/:id/:nbrJour/:idPersonel')
  async validerConge(@Param() Param) {
    const { id, nbrJour, idPersonel } = Param;
    console.log({ id, nbrJour, idPersonel });
    return this.congeService.validerConge(id, nbrJour, idPersonel);
  }
  //refuser conge  :
  @Put('refuserConge/:id')
  async refuserConge(@Param('id') id: number) {
    return await this.congeService.refuserConge(id);
  }
  //get nombre solde de conge :
  @Get('soldeConge/:id')
  async getSoldeConge(@Param('id') id) {
    console.log('solde conge');
    return this.congeService.getSoldeConge(id);
  }
}
