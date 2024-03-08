"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import slugify from "slugify";
import { revalidatePath } from "next/cache";

function isInvalidText(text: string) {
  return !text || text.trim() === "";
}

export async function shareMeal(
  state: { message: string } | null,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const slug = slugify(title, { lower: true });
  const imagePath = `/images/${slug}.${(formData.get("image") as File).name
    .split(".")
    .pop()}`;
  const meal = {
    title: title,
    slug: slug,
    summary: formData.get("summary") as string,
    instructions: formData.get("instructions") as string,
    image: formData.get("image") as File,
    imagePath: imagePath as string,
    creator: formData.get("name") as string,
    creator_email: formData.get("email") as string,
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }
  await saveMeal(meal);
  revalidatePath("/meals");
  redirect("/meals");
}
