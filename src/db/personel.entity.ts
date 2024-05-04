import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AutorisationEntity } from './entities/autorisation.entity';
import { CongeEntity } from './entities/conge.entity';

@Entity()
export class PersonelEntity {
  @PrimaryGeneratedColumn()
  idPersonle: number;
  @Column()
  username: string;
  @Column()
  email: string;

  @Column()
  password: string;
  @Column()
  status: string;
  @OneToMany(() => AutorisationEntity, (autorisation) => autorisation.personle)
  autorisation: AutorisationEntity[];
  @OneToMany(() => CongeEntity, (conge) => conge.personle)
  conge: CongeEntity[];
  @Column({ type: 'int', default: 25 })
  soldeCongeAnnuel: number;
  @Column({ type: 'int', default: 0 })
  soldeCongeRecup: number;
  @Column({ type: 'int', default: 6 })
  soldeCongeException: number;
}
