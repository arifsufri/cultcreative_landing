import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { setRequestLocale } from "next-intl/server";

// Dynamic imports for sections
const FloatingNavbar = dynamic(() =>
  import("@/app/[locale]/components/FloatingNavbar")
);

const HeroSection = dynamic(() =>
  import("@/app/[locale]/sections/newStories/storySections/HeroSection")
);
const VideosSection = dynamic(() =>
  import("@/app/[locale]/sections/newStories/storySections/VideosSection")
);
const StrategySection = dynamic(() =>
  import("@/app/[locale]/sections/newStories/storySections/StrategySection")
);
const SimilarStoriesSection = dynamic(() =>
  import("@/app/[locale]/sections/newStories/storySections/SimilarStoriesSection")
);
const NewFooter = dynamic(() =>
  import("@/app/[locale]/components/NewFooter")
);

export const metadata = {
  title: {
    absolute: "Success Story - Cult Creative",
  },
  description: "Read our inspiring success stories from leading brands.",
  openGraph: {
    title: "Success Story - Cult Creative",
  },
};

export default async function StoryDetailPage({ params }) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  // Mock data mapping - replace with real API data later
  const storiesData = {
    1: {
      title: "Longchamp",
      subtitle: "Success Story",
      campaignGoal:
        "The campaign set out to elevate Longchamp’s presence among Gen Z and Millennials, spark fresh interest in the iconic Le Pliage through relatable TikTok content and evaluate how CGC creators could drive stronger engagement and reach.",
      stats: [
        { label: "Views", value: "108K" },
        { label: "Reach", value: "60% Non-followers" },
        { label: "Creators", value: "8" },
      ],
      infoChips: [],
      strategyTitle: "Cult's Approach",
      strategyContent: [
        "A curated roster of creators brought Longchamp’s elegance-meets-everyday aesthetic to life, supported by narrative-led content that placed the product in authentic lifestyle contexts and spoke to varied consumer motivations.",
      ],
      videoThumbnails: [
        { id: 1, thumbnail: "https://storage.googleapis.com/cult_production/FIRST_DRAFT/cm919uc92006wqe01aswgso2r_copy_804528B9-D59A-4D6B-A7A6-E4780A19E07D.MOV?v=2025-04-11T00:32:16+00:00" },
        { id: 2, thumbnail: "https://storage.googleapis.com/cult_production/FINAL_DRAFT/cm9zqhp2z09hno6018hrv0let_copy_06EC6667-7EB4-41DA-A8E8-F567BA013010.mov?v=2025-05-02T10:29:25+00:00" },
        { id: 3, thumbnail: "https://storage.googleapis.com/cult_production/FINAL_DRAFT/cm9cm915p00d3pa01pmie5oth_longchamp%20le%20pliage%20draft%202.MOV?v=2025-04-23T05:26:32+00:00" },
        { id: 4, thumbnail: "https://storage.googleapis.com/cult_production/FIRST_DRAFT/cm9uqmhrk06e4o601c6sq3uxe_f696a51483954d26bb4aa9881dc3c8e9.mov?v=2025-04-25T07:09:09+00:00" },
      ]
    },
    2: {
      title: "Mariott Group",
      subtitle: "Success Story",
      campaignGoal:
        "Create relatable, high-quality content by humanising the brand and rolling out Marriott’s first multi-property CGC initiative",
      stats: [
        { label: "Views", value: "1.9K" },
        { label: "Reach", value: "1.25M" },
        { label: "Interactions", value: "500K" },
      ],
      infoChips: [
        "150 ASSETS PRODUCED",
      ],
      strategyTitle: "Cult's Approach",
      strategyContent: [
        "Creator-led, multi-campaign approach; detailed briefs and close collaboration across activations built trust, familiarity, and strong partnerships.",
      ],
      videoThumbnails: [
        { id: 1, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/marriott1.mov" },
        { id: 2, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/marriott2.mov" },
        { id: 3, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/marriott3.mov" },
        { id: 4, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/marriott4.mov" },
      ]
    },
    3: {
      title: "REXPERIENCE",
      subtitle: "Success Story",
      campaignGoal:
        "Drive ticket sales and strengthen visibility for a niche immersive art experience at REXKL, requiring a more direct and compelling conversion path beyond third-party platforms.",
      stats: [
        { label: "Ticket Sales", value: "RM100k" },
        { label: "Views", value: "2.5M" },
        { label: "Engagement", value: "11.4%" },
      ],
      infoChips: [],
      strategyTitle: "Cult's Approach",
      strategyContent: [
        "With no existing social presence, we activated creators across styles to build a digital presence from the ground up. Sensory, immersive storytelling brought the exhibition’s emotion online, engaging audiences in every format.",
      ],
      videoThumbnails: [
        { id: 1, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/rexperience2.mov" },
        { id: 2, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/rexperience3.mov" },
        { id: 3, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/rexperience.mov" },
        { id: 4, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/rexperience4.mov" },
      ]
    },
    4: {
      title: "Bata",
      subtitle: "Success Story",
      campaignGoal:
        "Bata ran three campaigns; Chinese New Year, Back To School and Raya to highlight their seasonal collections. ",
      stats: [
        { label: "Views", value: "705K" },
        { label: "Interactions", value: "17.1K" },
        { label: "Engagement", value: "128.84%" },
      ],
      infoChips: [],
      strategyTitle: "Cult's Approach",
      strategyContent: [
        "The Cult ensured that the creatorshad flexibility to personalise their content, resulting in authentic and original vidoes that resonated with their audiences.",
      ],
      videoThumbnails: [
        { id: 1, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/bata1.mp4" },
        { id: 2, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/bata2.mp4" },
        { id: 3, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/bata3.mp4" },
        { id: 4, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/bata4.mp4" },
      ]
    },
    5: {
      title: "Samsung",
      subtitle: "Success Story",
      campaignGoal:
        "Build strong product awareness by showcasing the phone’s capabilities in ways that capture attention fast.",
      stats: [
        { label: "Views", value: "465K" },
        { label: "Interactions", value: "24K" },
        { label: "Engagement", value: "5.34%" },
      ],
      infoChips: [],
      strategyTitle: "Cult's Approach",
      strategyContent: [
        "Trust the creators. By keeping their videos true to their style, we sparked content that audiences genuinely connect with.",
      ],
      videoThumbnails: [
        { id: 1, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/samsung1.mov" },
        { id: 2, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/samsung2.mp4" },
        { id: 3, thumbnail: "https://storage.googleapis.com/cult_production/FIRST_DRAFT/cmb92bcd104b7t001hviplsep_copy_CC2C8E5F-15BA-4E86-ACD5-9CEDC374A049.mov?v=2025-05-29T10:01:58+00:00" },
        { id: 4, thumbnail: "https://storage.googleapis.com/cult_production/FIRST_DRAFT/cmaovxgy40251n7011e47xj9n_copy_3A0E4390-A5BF-424A-A453-9E9A223409CD.mov?v=2025-05-23T05:15:30+00:00" },
      ]
    },
    6: {
      title: "Dressing Paula",
      subtitle: "Success Story",
      campaignGoal:
        "To show brand’s monthly arrivals and festive specials through a diverse creator mix, using storytelling, aesthetic soft-sell visuals, and relatable daily moments to build authentic engagement and a modern brand presence.",
      stats: [
        { label: "PR", value: "RM77K" },
        { label: "Views", value: "1M" },
        { label: "Creators Activated", value: "73" },
      ],
      infoChips: [],
      strategyTitle: "Cult's Approach",
      strategyContent: [
        "Onboarded female creators with diverse body shapes and sizes, from different cultural and religious backgrounds, expanding Dressing Paula's audiences and reach beyond its usual community.",
      ],
      videoThumbnails: [
        { id: 1, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/dressing_paula1.mp4" },
        { id: 2, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/dressing_paula2.mp4" },
        { id: 3, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/dressing_paula3.mp4" },
        { id: 4, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/dressing_paula4.mp4" },
      ]
    },
    7: {
      title: "Malaysia Pavilion: Osaka World Expo 2025",
      subtitle: "Success Story",
      campaignGoal:
        "The overarching goal was to translate the Pavilion’s three core brand pillars:  Human & Human, Human & Nature, and Human & Technology, into digital storytelling that resonates beyond the Expo’s physical footprint.",
      stats: [
        { label: "Views", value: "3.3M" },
        { label: "Assets Produced", value: "20" },
        { label: "Reach", value: "1.8M" },
      ],
      infoChips: [],
      strategyTitle: "Cult's Approach",
      strategyContent: [
        "We designed and executed a Creator-Generated Content campaign that transformed the Pavilion’s message into real, human stories through a Multi-Persona Creator Strategy.",
      ],
      videoThumbnails: [
        { id: 1, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/MY_pavilion1.mp4" },
        { id: 2, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/MY_pavilion2.mov" },
        { id: 3, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/MY_pavilion3.mov" },
        { id: 4, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/MY_pavilion4.mov" },
      ]
    },
    8: {
      title: "Noir",
      subtitle: "Success Story",
      campaignGoal:
        "Showcase Chef Ikhwan Rahman’s innovative, theatrical open-kitchen concept to drive desire for a uniquely immersive dining experience.",
      stats: [
        { label: "Views", value: "1.3M" },
        { label: "Reach", value: "50K" },
        { label: "Engagement", value: "6.2%" },
      ],
      infoChips: [],
      strategyTitle: "Cult's Approach",
      strategyContent: [
        "We maximised NOIR’s reach by combining Instagram foodie buzz with TikTok lifestyle creators, turning the restaurant into a must-visit hidden gem for the young and cool.",
      ],
      videoThumbnails: [
        { id: 1, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/noir1.mp4" },
        { id: 2, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/noir2.mov" },
        { id: 3, thumbnail: "https://storage.googleapis.com/cult_production/FIRST_DRAFT/cmd1auuos084po001r7ywaa0y_copy_4F76CFC8-AF19-41D9-BB23-996A3D339904.mov?v=2025-07-25T15:35:18+00:00" },
        { id: 4, thumbnail: "https://storage.googleapis.com/cult_production/FIRST_DRAFT/cmd1aw0hr085po0015qjp07ib_copy_7A312FE2-7F0F-44C4-AD5B-B6C81523D34E.mov?v=2025-07-26T05:54:08+00:00" },
      ]
    },
    9: {
      title: "The Body Shop",
      subtitle: "Success Story",
      campaignGoal:
        "Bata ran three campaigns; Chinese New Year, Back To School and Raya to highlight their seasonal collections.",
      stats: [
        { label: "Views", value: "705K" },
        { label: "Interactions", value: "17.1K" },
        { label: "Creators Activated", value: "42" },
      ],
      infoChips: [],
      strategyTitle: "Cult's Approach",
      strategyContent: [
        "The Cult ensured that the creatorshad flexibility to personalise their content, resulting in authentic and original vidoes that resonated with their audiences.",
      ],
      videoThumbnails: [
        { id: 1, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/bodyshop1.mp4" },
        { id: 2, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/bodyshop2.mp4" },
        { id: 3, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/bodyshop3.mov" },
        { id: 4, thumbnail: "https://storage.googleapis.com/landing-cultcreative/successStories/bodyshop4.mov" },
      ]
    },
  };

  // Get story data based on id, fallback to story 1 if not found
  const storyData = storiesData[id] || storiesData[1];

  return (
    <>
      <FloatingNavbar />
      <main className="flex flex-col w-full overflow-x-clip bg-white">
        {/* Hero Section */}
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-black">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
            </div>
          }
        >
          <HeroSection storyData={storyData} />
        </Suspense>

        {/* Videos Section */}
        <Suspense fallback={<div className="h-96 bg-white animate-pulse"></div>}>
          <VideosSection videos={storyData.videoThumbnails} />
        </Suspense>

        {/* Strategy Section */}
        <Suspense fallback={<div className="bg-white animate-pulse"></div>}>
          <StrategySection
            strategyTitle={storyData.strategyTitle}
            strategyContent={storyData.strategyContent}
          />
        </Suspense>

        {/* Similar Stories Section */}
        <Suspense fallback={<div className="h-96 bg-white animate-pulse"></div>}>
          <SimilarStoriesSection currentStoryId={parseInt(id)} />
        </Suspense>

        {/* Footer */}
        <NewFooter />
        <Toaster position="top-center" />
      </main>
    </>
  );
}