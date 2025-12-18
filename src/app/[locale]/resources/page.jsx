import dynamic from "next/dynamic";
import { setRequestLocale } from "next-intl/server";
import ResourceCard from "./ResourceCard";

const FloatingNavbar = dynamic(() => import("@/app/[locale]/components/FloatingNavbar"));
const NewFooter = dynamic(() => import("@/app/[locale]/components/NewFooter"));

const ResourcesPage = async ({ params }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  
  // Fetch articles from JSON file
  let articles = [];
  try {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(process.cwd(), 'src/data/resources.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    articles = JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading articles:', error);
  }

  return (
    <>
      <FloatingNavbar />
      <section
        className="min-h-screen w-full relative"
        style={{
          background: "linear-gradient(180deg, #7C4DFF 0%, #25123A 55%, #050109 100%)",
        }}
      >
        {/* Dot pattern overlay similar to FAQ page */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.08) 2px, transparent 2px)",
            backgroundSize: "22px 22px",
            backgroundPosition: "0 0",
            backgroundAttachment: "fixed",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.7))",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.7))",
          }}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-40 sm:pt-48 md:pt-56 pb-24">
          {/* Header Section */}
          <div className="relative text-center mb-20">
            <div className="relative inline-block">
              {/* Stars image - hidden on mobile */}
              <div className="absolute -left-60 -top-45 hidden md:block">
                <img 
                  src="/images/NewMain/stars.svg" 
                  alt="decorative stars" 
                  className="w-90 h-90"
                />
              </div>
              <h1
                className="-ml-10 md:ml-0"
                style={{
                  fontFamily: "Aileron",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 8vw, 64px)",
                  lineHeight: "clamp(32px, 8vw, 57.86px)",
                  letterSpacing: "-3.84px",
                  textTransform: "capitalize",
                  color: "#FFFFFF",
                  marginBottom: "1px"
                }}
              >
                Resources
              </h1>
            </div>
            <p
              style={{
                fontFamily: "Times New Roman",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "clamp(35px, 6vw, 48px)",
                lineHeight: "clamp(24px, 6vw, 40px)",
                letterSpacing: "-1.92px",
                textAlign: "center",
                width: "fit-content",
                color: "#FFFFFF",
              }}
              className="md:ml-[520px] ml-30 mr-0"
            >
              curated for you
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <ResourceCard key={index} article={article} />
            ))}
          </div>
        </div>
      </section>
      <NewFooter />
    </>
  );
};

export const metadata = {
  title: {
    absolute: "Creators' Tips & Guides - Cult Creative",
  },
  description:
    "Discover invaluable insights and resources at Cult Creative's blog. Dive into inspiration, expert tips, and stay ahead of industry trends.",
  openGraph: {
    title: "Resources - Cult Creative",
    description: "Discover invaluable insights and resources at Cult Creative's blog. Dive into inspiration, expert tips, and stay ahead of industry trends.",
  },
  alternates: {
    canonical: "/resources",
  },
};

export default ResourcesPage;
