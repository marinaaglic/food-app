"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import slugify from "slugify";

export async function shareMeal(formData: FormData) {
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
  await saveMeal(meal);

  redirect("/meals");
}
