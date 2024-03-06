import sql from "better-sqlite3";
const db = sql("meals.db");
import { MealItemProps } from "@/components/meals/meal-item";

type Meal = {
  title: string;
  slug: string;
  image: string;
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
