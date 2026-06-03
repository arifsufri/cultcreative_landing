"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const FloatingNavbar = dynamic(
  () => import("@/app/[locale]/components/FloatingNavbar"),
);
const NewFooter = dynamic(() => import("@/app/[locale]/components/NewFooter"));

const categories = [
  {
    title: "General",
    items: [
      {
        q: "What is Cult Creative?",
        a: "Cult Creative is an all-in-one platform for creators and brands to seamlessly work, collaborate, and elevate their social media game. We help businesses effortlessly reach and grow their audiences with creator-generated content (CGC), and empower creators to focus on what they love doing the most, and receive fair and timely compensation for their work.",
      },
      {
        q: "Do you represent the creators you work with?",
        a: "No. While we do assess and carefully select our creators during the curation process, we do not represent them. We believe in matching the right creators to the right campaigns.",
      },
      {
        q: "Are the partnerships on your platform reliable?",
        a: "At Cult Creative, we ensure the quality and reliability of our partnerships by carefully vetting each brand and creator, continuously monitoring performance, and practicing open communication. We also prioritise transparency and accountability by making sure all parties have the support they need to succeed.",
      },
      {
        q: "How do you handle disputes between brands and creators?",
        a: "We have auto-generated agreements that clearly outline the responsibilities and deliverables of each party. But should a dispute arise, we will work closely with both parties to understand their concerns, provide support, and help find a solution that aligns with our values of transparency, respect, and collaboration.",
      },
      {
        q: "How do I contact the team for more detailed questions or technical support?",
        a: "Drop us an email at hello@cultcreative.asia or WhatsApp us at +60 17-869 8757.",
      },
    ],
  },
  {
    title: "For Creators",
    items: [
      {
        q: "Is there a subscription or membership fee to use Cult Creative?",
        a: "Nope, our Creator Platform is free for content creators! Just create an account and start pitching for campaigns.",
      },
      {
        q: "How do I become a content creator with Cult Creative?",
        a: "It's simple!\n\nStep 1: Create a profile on our Creator Platform and link your social media accounts to get curated brand deals.\n\nStep 2: Start pitching to campaigns on our Discover page.\n\nStep 3: Once you've been selected for a campaign, you can start creating content and posting!",
      },
    ],
  },
  {
    title: "For Brands",
    items: [
      {
        q: "What makes Cult Creative different from other influencer marketing platforms?",
        a: "We're not just another influencer marketing platform. Beyond our client-first approach and industry-specific strategies, we're also committed to nurturing our creators by making sure they get paid within 30 days and are supported with the resources they need to succeed.",
      },
      {
        q: "How do you connect brands with content creators?",
        a: "With over 13,000 creators in our network, we match creators whose style, audience, and expertise align with your brand's identity and goals. This is to ensure we deliver only the most authentic, engaging, and impactful content.",
      },
      {
        q: "What type of projects or campaigns can be facilitated by Cult Creative?",
        a: "We work on all kinds of campaigns, from helping startups and small businesses scale their marketing to supporting global brands in their endeavor to create impactful creator marketing campaigns. Our clients vary across many industries, including F&B, fashion and beauty, health and wellness, tourism, and motherhood.",
      },
    ],
  },
];

const PlusIcon = ({ open }) => (
  <span
    aria-hidden
    style={{
      width: 40,
      height: 40,
      paddingTop: 10,
      paddingRight: 14,
      paddingBottom: 13,
      paddingLeft: 14,
      gap: 4,
      borderRadius: 8,
      background: "linear-gradient(180deg, #8A5AFE 0%, #1340FF 100%)",
      boxShadow: "0px -3px 0px 0px #00000073 inset",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#FFFFFF",
    }}
  >
    {open ? (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="1" y="5.5" width="10" height="1" rx="0.5" fill="#FFFFFF" />
      </svg>
    ) : (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="1" y="5.5" width="10" height="1" rx="0.5" fill="#FFFFFF" />
        <rect
          x="6.5"
          y="1"
          width="10"
          height="1"
          rx="0.5"
          fill="#FFFFFF"
          transform="rotate(90 6.5 1)"
        />
      </svg>
    )}
  </span>
);

const AccordionItem = ({ question, answer, idx }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useState(null)[0];

  return (
    <div className="rounded-2xl bg-white/95 shadow-md ring-1 ring-black/10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "Times New Roman",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "18px",
            lineHeight: "24px",
            letterSpacing: "0",
            color: "#231F20",
          }}
        >
          {question}
        </span>
        <PlusIcon open={open} />
      </button>
      <div
        ref={(el) =>
          AccordionItem._refs
            ? (AccordionItem._refs[idx] = el)
            : (AccordionItem._refs = { [idx]: el })
        }
        style={{
          maxHeight:
            open && AccordionItem._refs && AccordionItem._refs[idx]
              ? AccordionItem._refs[idx].scrollHeight
              : 0,
          overflow: "hidden",
          transition: "max-height 300ms ease, opacity 300ms ease",
          opacity: open ? 1 : 0,
        }}
      >
        <div
          className="px-6 pb-5 text-sm text-[#231F20]/80 whitespace-pre-line"
          style={{
            fontFamily: "Aileron",
            fontWeight: 400,
            fontStyle: "normal",
            letterSpacing: "0",
          }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
};

const FaqPage = () => {
  return (
    <>
      <FloatingNavbar />
      <section
        className="min-h-screen w-full relative"
        style={{
          background: "linear-gradient(180deg, #FF3500 0%, #231F20 100%)",
        }}
      >
        {/* Subtle dotted pattern overlay (fixed, responsive) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.12) 2px, transparent 2px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0",
            backgroundAttachment: "fixed",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.5))",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.5))",
          }}
        />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-40 sm:pt-48 md:pt-56 pb-24">
          {/* Header */}
          <div className="relative text-center mb-20 sm:mb-52 md:mb-64">
            <h1
              style={{
                fontFamily: "Aileron",
                fontWeight: 700,
                fontStyle: "Bold",
                fontSize: "clamp(40px, 10vw, 64px)",
                lineHeight: "1.1",
                letterSpacing: "-0.06em",
                textTransform: "capitalize",
                color: "#FFFFFF",
                whiteSpace: "nowrap",
                backgroundImage: "url('/images/NewMain/faqpage.svg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right center",
                position: "relative",
                display: "inline-block",
              }}
            >
              What The FAQ?
            </h1>
            <p
              style={{
                fontFamily: "Times New Roman",
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: "48px",
                lineHeight: "40px",
                letterSpacing: "-0.04em",
                color: "#FFFFFF",
                textAlign: "center",
                marginTop: "24px",
              }}
            >
              We've got answers.
            </p>
            <div
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 hidden md:block"
              style={{ top: "calc(100% - 120px)", zIndex: 0 }}
            >
              <img
                src="/images/NewMain/starsfaq.svg"
                alt="Decorative stars"
                className="w-160 md:w-180 h-auto opacity-100"
              />
            </div>
          </div>

          {/* FAQs */}
          <div className="space-y-14">
            {categories.map((cat) => (
              <div key={cat.title}>
                <h2
                  className="mb-5"
                  style={{
                    fontFamily: "Aileron",
                    fontWeight: 700,
                    fontStyle: "Bold",
                    fontSize: "20px",
                    lineHeight: "24px",
                    color: "#FFFFFF",
                  }}
                >
                  {cat.title}
                </h2>
                <div className="space-y-4">
                  {cat.items.map((item, i) => (
                    <AccordionItem
                      key={`${cat.title}-${i}`}
                      question={item.q}
                      answer={item.a}
                      idx={i}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <NewFooter />
    </>
  );
};

export default FaqPage;
