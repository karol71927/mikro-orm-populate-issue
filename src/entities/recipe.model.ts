import {
  Collection,
  Entity,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Ingredient } from './ingredient.model';

@Entity()
export class Recipe {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property({
    onCreate: () => new Date(),
  })
  createdAt: Date;

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients = new Collection<Ingredient>(this);

  constructor(title: string) {
    this.title = title;
  }
}
