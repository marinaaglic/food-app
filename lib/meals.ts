import sql from "better-sqlite3";
const db = sql("meals.db");
import { MealItemProps } from "@/app/type/meal-item";
import { Meal } from "@/app/type/meal";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

export async function getMeals(): Promise<MealItemProps[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //throw new Error("Loading meals failed.");
  return db.prepare("SELECT * FROM meals").all() as MealItemProps[];
}

export function getMeal(slug: string): Meal {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as Meal;
}

export async function saveMeal(meal: Meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed.");
    }
  });

  meal.imagePath = `/images/${fileName}`;
  db.prepare(
    `
  INSERT INTO meals
  (title, summary, instructions, creator, creator_email, image, slug)
  VALUES (
    @title,
    @summary,
    @instructions,
    @creator,
    @creator_email,
    @imagePath,
    @slug
  )
  `
  ).run(meal);
}
