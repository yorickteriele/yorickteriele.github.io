import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StatusPage from "@/components/StatusPage";
import { generateMetadata } from "@/utils/seo";

export const metadata = generateMetadata({
  title: "Status",
  description: "Live status of the projects Yorick te Riele hosts.",
  path: "/status/",
});

export default function Status() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <StatusPage />
      </main>
      <Footer />
    </div>
  );
}
