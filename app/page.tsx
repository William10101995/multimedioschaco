import MediaGrid from "@/components/media-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import { Montserrat } from "next/font/google";
import { SiteLogo } from "@/components/site-logo";
import TransmissionsCrawl from "@/components/transmissions-crawl";
import Footer from "@/components/footer";

// Cargar la fuente Montserrat para el título
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white flex flex-col">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <SiteLogo className="h-12 sm:h-14 w-auto" />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div id="fullscreen-container" className="fullscreen-container flex-grow">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <MediaGrid />
        </div>
      </div>

      <TransmissionsCrawl />

      <Footer />
    </main>
  );
}
