import { ReactNode } from "react";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: "NextLevel Food",
  description: "Delicious meals, shared by a food-loving community.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
