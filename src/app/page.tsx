import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
            <p className="text-xl text-muted-foreground">
              Full-stack developer passionate about creating innovative web solutions
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
