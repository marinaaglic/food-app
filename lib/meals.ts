import sql from "better-sqlite3";
const db = sql("meals.db");
import { MealItemProps } from "@/components/meals/meal-item";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

type Meal = {
  title: string;
  slug: string;
  image: File;
  imagePath: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};

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
