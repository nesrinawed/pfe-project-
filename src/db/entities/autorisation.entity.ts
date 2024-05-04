import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonelEntity } from '../personel.entity';

@Entity()
export class AutorisationEntity {
  @PrimaryGeneratedColumn()
  idAutorisation: number;
  @Column({ type: 'date' })
  jourAutorisation: Date;
  @Column({ type: 'time' })
  heureSortie: string;
  @Column({ type: 'time' })
  heureEntre: string;
  @Column({
    type: 'enum',
    enum: ['non', 'en attente', 'accepte', 'refuse', 'valide'],
  })
  etatAutorisation: string;
  @ManyToOne(() => PersonelEntity, (personel) => personel.autorisation)
  @JoinColumn()
  personle: PersonelEntity;
}
