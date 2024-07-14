import { v4 as uuidv4 } from 'uuid';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  BeforeInsert,
  JoinTable,
} from 'typeorm';
import { Tag } from '../tags/tags.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @BeforeInsert()
  generateId() {
    this.id = uuidv4;
  }
}
