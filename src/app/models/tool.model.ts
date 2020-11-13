import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tools')
class Tool {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  link: string;

  @Column()
  description: string;

  @Column({ array: true })
  tags: string
}

export default Tool
