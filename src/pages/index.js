import Card from "@/components/home/Card";
import CarouselComponent from "@/components/home/Carousel";
import { Geist, Geist_Mono } from "next/font/google";
import cardData from "@/store/cardData.json";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  let categories = new Set();
  let catergoryArray;
  const foodData = [];

  const handleData = () => {
    cardData.map((data) => {
      return foodData.push(data), categories.add(data.category);
    });
  };

  handleData();

  catergoryArray = [...categories];

  return (
    <>
      <CarouselComponent />
      <div className="container mx-auto">
        {catergoryArray.map((category) => {
          return (
            <>
              <div
                key={category}
                className="text-4xl mt-10 mb-3 uppercase font-bold"
              >
                {category}
              </div>
              <hr />
              <div className="flex flex-col items-center justify-center">
                <div className="grid mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {foodData
                    .filter((foodData) => category === foodData.category)
                    .map((data) => {
                      return <Card key={data.name} foodData={data} />;
                    })}
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
