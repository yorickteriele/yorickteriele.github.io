import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ReadingPage from "@/components/ReadingPage";
import { generateMetadata } from "@/utils/seo";

export const metadata = generateMetadata({
  title: "Reading",
  description: "Books Yorick te Riele has read and wants to read, synced from Goodreads.",
  path: "/reading/",
});

export default function Reading() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <ReadingPage />
      </main>
      <Footer />
    </div>
  );
}
