import Hero from "@/components/Hero";
import FeaturedBooks from "@/components/FeaturedBooks";
import FooterSplit from "@/components/FooterSplit";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <FeaturedBooks />
      </main>
      <FooterSplit />
    </>
  );
}