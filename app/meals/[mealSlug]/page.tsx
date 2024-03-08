import classes from "./page.module.css";
import Image, { StaticImageData } from "next/image";
import { getMeal } from "@/lib/meals";
import { notFound } from "next/navigation";
import { MealsDetailProps } from "@/app/type/meal-item";

// export async function generateMetadata({ params }: MealsDetailProps) {
//   const meal = getMeal(params.mealSlug);
//   if (!meal) {
//     notFound();
//   }
//   return {
//     title: meal.title,
//     description: meal.summary,
//   };
// }

export default function MealsDetailPage({ params }: MealsDetailProps) {
  const meal = getMeal(params.mealSlug);
  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br>");
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          {/* error */}
          <Image src={meal.imagePath} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            {" "}
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
