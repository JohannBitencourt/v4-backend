import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('tools')
class Tool {
  @PrimaryGeneratedColumn('increment')
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
