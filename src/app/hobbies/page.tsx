import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HobbiesFull from "@/components/HobbiesFull";
import { generateMetadata as buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata({
  title: "Hobbies",
  description: "What I get up to outside of code, including what I'm currently reading.",
  path: "/hobbies/",
});

export default function HobbiesPage() {
  return (
    <div className="site-shell">
      <Header />
      <main className="pt-24">
        <HobbiesFull />
      </main>
      <Footer />
    </div>
  );
}
