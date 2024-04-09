import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  // @ts-ignore
  @PrimaryGeneratedColumn('uuid', { length: 36 })
  idx: string;

  @Column({ type: 'varchar' })
  id: string;

  @Column({ type: 'varchar' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
