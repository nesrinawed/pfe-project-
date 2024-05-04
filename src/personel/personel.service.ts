import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonelEntity } from 'src/db/personel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonelService {
  //constructeur  :
  constructor(
    @InjectRepository(PersonelEntity)
    private readonly personelRespositry: Repository<PersonelEntity>,
  ) {}

  //validation  :

  async validatePersonel(bodydata) {
    const { email, password } = bodydata;
    const user = await this.personelRespositry.findOneBy({ email: email });
    if (!user) {
      return 'not account found for this user ';
    } else {
      if (user.password === password) {
        console.log('vrai password ');
        return user;
      } else {
        return 'wrong password';
      }
    }
  }
}
