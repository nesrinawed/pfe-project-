import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AutorisationEntity } from 'src/db/entities/autorisation.entity';
import { PersonelEntity } from 'src/db/personel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AutorisationService {
  constructor(
    @InjectRepository(AutorisationEntity)
    private readonly autorisationRepo: Repository<AutorisationEntity>,
    @InjectRepository(PersonelEntity)
    private readonly personelRep: Repository<PersonelEntity>,
  ) {}

  //get all autorisation   :
  async getAllAut(): Promise<AutorisationEntity[]> {
    const sql =
      'SELECT * FROM autorisation_entity , personel_entity WHERE autorisation_entity.personleIdPersonle= personel_entity.idPersonle';
    const allAut = await this.autorisationRepo.query(sql);
    return allAut;
  }

  //accepter autorisation  :

  async accepterAutorisation(id: number): Promise<AutorisationEntity> {
    const autorisation = await this.autorisationRepo.findOneBy({
      idAutorisation: id,
    });
    autorisation.etatAutorisation = 'accepte';
    return this.autorisationRepo.save(autorisation);
  }

  //refuser autorisation  :

  async refuserAut(id: number): Promise<AutorisationEntity> {
    const autorisation = await this.autorisationRepo.findOneBy({
      idAutorisation: id,
    });
    autorisation.etatAutorisation = 'refuse';
    return this.autorisationRepo.save(autorisation);
  }

  //valider  :
  async validerAut(id: number): Promise<AutorisationEntity> {
    const autorisation = await this.autorisationRepo.findOneBy({
      idAutorisation: id,
    });
    autorisation.etatAutorisation = 'valide';
    return this.autorisationRepo.save(autorisation);
  }

  //demander autorisation  :

  async deposerAutorisation(
    jourAutorisation: Date,
    heureSortie: string,
    heureEntre: string,
    personelId: number,
  ): Promise<AutorisationEntity> {
    // Retrieve the PersonelEntity instance for the user making the request
    const personel = await this.personelRep.findOneBy({
      idPersonle: personelId,
    });

    // Create a new instance of AutorisationEntity with the appropriate properties set
    const autorisation = new AutorisationEntity();
    autorisation.jourAutorisation = jourAutorisation;
    autorisation.heureSortie = heureSortie;
    autorisation.heureEntre = heureEntre;
    autorisation.etatAutorisation = 'en attente';
    autorisation.personle = personel;

    // Save the new entity
    return this.autorisationRepo.save(autorisation);
  }
}
