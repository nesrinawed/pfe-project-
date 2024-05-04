import { Body, Controller, Post } from '@nestjs/common';
import { PersonelService } from './personel.service';

@Controller('personel')
export class PersonelController {
  constructor(private readonly personelService: PersonelService) {}
  //login personel  :
  @Post('auth')
  async loginEmploye(@Body() body: any) {
    const emp = await this.personelService.validatePersonel(body);
    return emp;
  }
}
