import Card from "@/components/home/Card";
import CarouselComponent from "@/components/home/Carousel";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <CarouselComponent />
      <Card />
    </>
  );
}
