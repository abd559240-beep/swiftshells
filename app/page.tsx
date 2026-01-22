import { HeroSectionOne } from "@/features/home/sections/HeroSection";
import Navbar from "@/features/home/sections/Navbar";

export default function HomePage() {
  return (
    <div>
      <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
        <Navbar />
        <HeroSectionOne />
      </div>
    </div>
  );
}
