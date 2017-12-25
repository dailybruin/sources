import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Sources')
export class Source {
  @PrimaryGeneratedColumn() public id: number;
  @Column() public name: string;
  @Column() public org: string;
  @Column() public phone: string;
  @Column() public email: string;
  @Column() public notes: string;
}
