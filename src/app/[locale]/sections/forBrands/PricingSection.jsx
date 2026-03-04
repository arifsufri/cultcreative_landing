"use client";

import Card from "@/components/Card";
import React, { useState } from "react";
import pricings from "@/data/pricings.json";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const PricingSection = () => {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "my";
  const [billingType, setBillingType] = useState("monthly");

  const pricing =
    locale === "sg"
      ? pricings.find((pricing) => pricing.currency === "SGD")
      : pricings.find((pricing) => pricing.currency === "MYR");

  return (
    <div className="bg-white pt-20">
      <div className="flex gap-8 justify-start lg:justify-center pt-16 bg-inherit overflow-auto not-sm:px-3 snap-x snap-mandatory sm:snap-none">
        {pricing.plans.map((plan) => (
          <Card
            key={plan.id}
            plan={{
              ...plan,
              currency: pricing.currency,
              highlighted: plan.id === "growth",
            }}
            billingType={billingType}
            setBillingType={() =>
              setBillingType((prev) =>
                prev === "monthly" ? "one_off" : "monthly",
              )
            }
          />
        ))}
      </div>

      <div className="text-black text-center px-5 mt-6">
        <p className="text-sm sm:text-base font-light sm:font-medium">
          *Excluding SST. Additional charges apply for cross-posting videos and
          monthly ads-usage rights. Bulk price available.
        </p>
        <p className="my-2 text-lg leading-5 sm:text-base text-pretty">
          Looking for a better fit?{" "}
          <span className="font-semibold">
            We offer custom packages that can be tailored to your campaign
            needs.
          </span>
        </p>
        <p className="my-3 text-lg leading-6 sm:text-base font-light">
          Contact us today to learn more.
        </p>

        <motion.button
          className="px-16 py-4 md:py-4 md:text-lg font-aileron text-white font-semibold rounded-full text-lg shadow-lg mt-8 cursor-pointer"
          style={{
            backgroundColor: "#1340ff",
            background: "#1340ff",
            filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))",
          }}
          whileHover={{
            scale: 1.05,
            filter: "drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))",
          }}
          transition={{ duration: 0.3 }}
          onClick={() =>
            window.open(
              "https://psg0xjbmy530.sg.larksuite.com/scheduler/ff2f9eae30e860b6",
              "_blank",
            )
          }
        >
          <span className="flex items-center gap-2">
            Let’s have a quick chat
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="inline-block"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </motion.button>
      </div>
    </div>
  );
};

export default PricingSection;
