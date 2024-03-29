import MealItem from "./meal-item";
import { MealItemProps } from "@/app/type/meal-item";
import classes from "./meals-grid.module.css";

type MealsGridProps = {
  meals: MealItemProps[];
};

export default function MealsGrid({ meals }: MealsGridProps) {
  return (
    <ul className={classes.meals}>
      {meals.map((meal) => (
        <li key={meal.slug}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
}
