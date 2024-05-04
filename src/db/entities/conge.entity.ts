import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PersonelEntity } from '../personel.entity';

@Entity()
export class CongeEntity {
  @PrimaryGeneratedColumn()
  idConge: number;
  @Column({
    type: 'enum',
    enum: ['en attente', 'accepte', 'refuser', 'valide'],
  })
  etatConge: string;
  @Column()
  raisonConge: string;

  @Column({ type: 'date' })
  dateDebutConge: Date;
  @Column({ type: 'date' })
  dateFinConge: Date;
  @Column({
    type: 'enum',
    enum: ['annuel ', 'exceptionel', 'recuperation'],
  })
  typeConge: string;

  @ManyToOne(() => PersonelEntity, (personel) => personel.autorisation)
  @JoinColumn()
  personle: PersonelEntity;
}
