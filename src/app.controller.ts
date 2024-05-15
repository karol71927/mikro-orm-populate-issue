import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MikroORM } from '@mikro-orm/core';
import { Recipe } from './entities/recipe.model';
import { Ingredient } from './entities/ingredient.model';

@Controller()
export class AppController {
  constructor(private readonly orm: MikroORM) {}

  @Post()
  async populate() {
    await this.orm.getMigrator().up();
    const em = this.orm.em.fork();
    const recipe = new Recipe('My first recipe');
    recipe.ingredients.add(new Ingredient('Flour', 500));
    recipe.ingredients.add(new Ingredient('Sugar', 200));
    recipe.ingredients.add(new Ingredient('Milk', 200));
    em.persist(recipe);
    await em.flush();
  }

  @Get()
  async getHello() {
    const em = this.orm.em.fork();

    const recipe = await em.findOne(
      Recipe,
      { title: 'My first recipe' },
      { populate: ['ingredients'] },
    );

    const withPopulate = recipe.ingredients
      .getItems()
      .find((x) => x.name === 'Flour');

    console.log(withPopulate);

    const ingredients = await em.find(Ingredient, {
      recipe: { id: recipe.id },
    });

    const withoutPopulate = ingredients.find((x) => x.name === 'Flour');
    console.log(withoutPopulate);
  }
}
