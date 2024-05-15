import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { Recipe } from './recipe.model';

@Entity()
export class Ingredient {
  @PrimaryKey()
  id: number;

  @Property()
  name: string;

  @Property()
  quantity: number;

  @Property({
    onCreate: () => new Date(),
  })
  createdAt: Date;

  @ManyToOne(() => Recipe)
  recipe: Recipe;

  constructor(name: string, quantity: number) {
    this.name = name;
    this.quantity = quantity;
  }
}
