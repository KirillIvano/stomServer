import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    @Column()
    info: string;
    @Column()
    image: string;
}
