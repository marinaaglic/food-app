import { StaticImageData } from "next/image";

export type MealItemProps = {
  title: string;
  slug: string;
  image: StaticImageData;
  imagePath: string;
  summary: string;
  instructions: string;
  creator: string;
  creator_email: string;
};
