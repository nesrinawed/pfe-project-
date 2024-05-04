import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AutorisationService } from './autorisation.service';

@Controller('autorisation')
export class AutorisationController {
  constructor(private readonly autService: AutorisationService) {}

  //demander  autorisation  :
  @Post(':idPersonel')
  async demanderAut(@Body() body, @Param('idpersonel') idPersonel) {
    const heureSortie = body.heureSortie;
    const heureRetour = body.heureRetour;
    const jourAut = body.date;
    return await this.autService.deposerAutorisation(
      jourAut,
      heureSortie,
      heureRetour,
      idPersonel,
    );
  }

  //get all autorisation  :
  @Get()
  async getAllAutorisation() {
    return await this.autService.getAllAut();
  }
  //accepter autorisation  :
  @Put('accepterAut/:id')
  async accepterAutorsation(@Param('id') id: number) {
    return await this.autService.accepterAutorisation(id);
  }
  //refuser autorisation  :
  @Put('refuserAut/:id')
  async refuserAut(@Param('id') id: number) {
    return await this.autService.refuserAut(id);
  }
  //valider autorisation  :
  @Put('validerAut/:id')
  async validerAut(@Param('id') id: number) {
    console.log('valider Aut');
    return await this.autService.validerAut(id);
  }
}
