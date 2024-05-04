import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CongeEntity } from 'src/db/entities/conge.entity';
import { PersonelEntity } from 'src/db/personel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CongeService {
  constructor(
    @InjectRepository(CongeEntity)
    private readonly congeRepo: Repository<CongeEntity>,
    @InjectRepository(PersonelEntity)
    private readonly personelRepo: Repository<PersonelEntity>,
  ) {}

  //get all congea  :

  async getAllConge(): Promise<CongeEntity[]> {
    const sql =
      'SELECT * FROM `conge_entity` , personel_entity WHERE conge_entity.personleIdPersonle = personel_entity.idPersonle';
    const allAut = await this.congeRepo.query(sql);
    return allAut;
  }

  //refuser un conge  :
  async refuserConge(id: number): Promise<CongeEntity> {
    const conge = await this.congeRepo.findOneBy({
      idConge: id,
    });
    conge.etatConge = 'refuser';
    return this.congeRepo.save(conge);
  }
  //accepter un conge   :
  async accepterConge(id: number): Promise<CongeEntity> {
    const conge = await this.congeRepo.findOneBy({
      idConge: id,
    });
    conge.etatConge = 'accepte';
    return this.congeRepo.save(conge);
  }
  //valider un conge  :
  //!!!remarque il reste ici a ajouter a solde de conge et son type  :

  async validerConge(
    idConge: number,
    nombreJour: number,
    idPersonel: number,
  ): Promise<CongeEntity> {
    const conge = await this.congeRepo.findOneBy({
      idConge: idConge,
    });
    conge.etatConge = 'valide';

    //add nombre de jour de conge au solde  :
    const personel = await this.personelRepo.findOneBy({
      idPersonle: idPersonel,
    });
    if (conge.typeConge == 'annuel') {
      personel.soldeCongeAnnuel = personel.soldeCongeAnnuel - nombreJour;
    } else if (conge.typeConge == 'exceptionel') {
      personel.soldeCongeException = personel.soldeCongeException - nombreJour;
    }
    console.log(personel);
    await this.personelRepo.save(personel);
    return this.congeRepo.save(conge);
  }
  //demander conge   :
  async deposerConge(
    typeConge,
    dateDebutConge,
    dateFinConge,
    raisonConge,
    idPersonel,
  ) {
    const etatConge = 'en attente';
    const congeToAdd = {
      typeConge,
      dateDebutConge,
      dateFinConge,
      etatConge,
      raisonConge,
    };
    const personel = await this.personelRepo.findOneBy({
      idPersonle: idPersonel,
    });
    const conge = await this.congeRepo.create(congeToAdd);
    conge.personle = personel;

    return await this.congeRepo.save(conge);
  }

  //get solde conge annuel  :
  async getSoldeConge(idPersone): Promise<PersonelEntity> {
    const personel = await this.personelRepo.findOneBy({
      idPersonle: idPersone,
    });

    return personel;
  }
  //get solde conge recuperation  :
  //get solde conge exception  :
}
