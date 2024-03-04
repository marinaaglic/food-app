interface MealsDetailProps {
  params: { slug: string };
}

export default function MealsDetailPage({ params }: MealsDetailProps) {
  return <h1>Meal Details Page</h1>;
}
