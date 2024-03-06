import sql from "better-sqlite3";
const db = sql("meals.db");
import { MealItemProps } from "@/components/meals/meal-item";

export async function getMeals(): Promise<MealItemProps[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return db.prepare("SELECT * FROM meals").all() as MealItemProps[];
}
