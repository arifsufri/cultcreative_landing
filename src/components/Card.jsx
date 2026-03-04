"use client";

import clsx from "clsx";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const Card = ({ plan, billingType, setBillingType }) => {
  // const [billingType, setBillingType] = useState("monthly");

  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "my";

  const router = useRouter();

  const isAvailabilityExist = plan?.availability;

  const availability =
    isAvailabilityExist && plan.availability.split("_").join(" ");

  const billing =
    plan.billing.find((b) => b.type === billingType) || plan.billing[0];

  // const duration = billing.duration.split("_").join(" ").slice(0, 4);

  return (
    <div className="bg-white border text-black not-sm:min-w-80 sm:w-70 rounded-xl p-5 border-slate-300 inset-shadow-sm snap-center">
      <div className="flex flex-col justify-center items-start sm:items-center gap-3 sm:gap-6">
        <span
          className={clsx(
            "border p-1 rounded-2xl min-w-25 text-center font-medium border-[#C9C9C9] flex items-center justify-center",
            plan.id === "growth" &&
              "bg-linear-to-r from-[#1340FF] to-[#0067D5] text-white border-0 pl-2",
          )}
        >
          {plan.name}
          {plan.id === "growth" && (
            <Image
              src="/test.svg"
              alt="decorative stars"
              width={15}
              height={15}
              className="w-7 h-7 opacity-100"
              loading="eager"
            />

            // <Image width={50} height={50} src={"/logo/Star.svg"} alt="star" />
          )}
        </span>

        {isAvailabilityExist && (
          <p className="italic font-light">{availability}</p>
        )}

        {plan.billing.length > 1 && (
          <BillingToggle
            billingType={billingType}
            setBillingType={setBillingType}
            plan={plan}
          />
        )}

        <h1
          className={clsx(
            "text-3xl font-bold tracking-tighter",
            plan.id === "growth" &&
              "bg-linear-to-r from-[#0067D5] via-[#1340FF] to-[#001FA3] text-transparent bg-clip-text",
          )}
        >
          {new Intl.NumberFormat("en-MY", {
            style: "currency",
            maximumFractionDigits: 0,
            currency: plan.currency || "MYR",
          }).format(billing?.price)}
          <span className="text-xs font-light tracking-tighter">
            {billingType === "one_off" || plan.billing.length < 2
              ? "/one-off"
              : `/month`}
          </span>
        </h1>
      </div>

      <ul className="flex flex-col gap-1 mt-5 sm:mt-10 px-2 text-left">
        <li
          className={clsx(
            "font-semibold text-sm underline underline-offset-2 flex items-start gap-3",
            plan.id === "growth" ? "text-[#1340FF]" : "text-[#8A5AFE]",
          )}
        >
          {plan.id === "growth" ? (
            <Image
              src={"/logo/blue_logo.svg"}
              width={13}
              height={13}
              alt="logo"
            />
          ) : (
            <Image
              src={"/logo/purple_logo.svg"}
              width={13}
              height={13}
              alt="logo"
            />
          )}

          <p
            onClick={() => router.push(`/${locale}/cgc-credits`)}
            className="cursor-pointer"
          >
            {billing.credits} CGC Credits
          </p>
        </li>
        <li
          className={clsx(
            "font-semibold text-sm flex items-start gap-3",
            plan.id === "growth" ? "text-[#1340FF]" : "text-[#FF3500]",
          )}
        >
          {plan.id === "growth" ? (
            <Image
              src={"/logo/blue_logo.svg"}
              width={13}
              height={13}
              alt="logo"
            />
          ) : (
            <Image
              src={"/logo/orange_logo.svg"}
              width={13}
              height={13}
              alt="logo"
            />
          )}
          <span>
            {billing.duration.split("_").join(" ")}{" "}
            <span className="text-black font-light">Credit Validity</span>
          </span>
        </li>
        <li
          className={clsx(
            "font-semibold text-sm flex items-start gap-3",
            plan.id === "growth" ? "text-[#1340FF]" : "text-[#026D54]",
          )}
        >
          {plan.id === "growth" ? (
            <Image
              src={"/logo/blue_logo.svg"}
              width={13}
              height={13}
              alt="logo"
            />
          ) : (
            <Image
              src={"/logo/green_logo.svg"}
              width={13}
              height={13}
              alt="logo"
            />
          )}
          <span>
            {plan.campaign_support
              .slice(0, 1)
              .toUpperCase()
              .concat(plan.campaign_support.slice(1))}{" "}
            <span className="text-black font-light">Campaign Support</span>
          </span>
        </li>
      </ul>

      <div className="w-full bg-[#C9C9C9] h-px my-5" />

      <div>
        <h3 className="font-light">
          Choose <span className="font-semibold">{plan.name}</span> if you:
        </h3>
        <ul className="list-disc ml-6 mt-3 flex flex-col gap-3">
          {plan.best_for.map((item, index) => (
            <li key={index} className="text-left text-sm">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        <h3 className="font-light">What key features you can expect:</h3>
        <ul className="list-image-[url(/logo/Vector.png)] ml-6 mt-3 flex flex-col gap-3">
          {plan.features.map((item, index) => (
            <li key={index} className="text-left text-sm pl-2">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Card;

function BillingToggle({ billingType, setBillingType, plan }) {
  return (
    <div
      className={clsx(
        "relative flex text-xs bg-[#E7E7E7] rounded-full p-0.5 w-max border",
        plan.id === "growth" ? "border-[#1340FF] " : "border-[#D3D3D3]",
      )}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute inset-y-px rounded-full bg-white shadow"
        style={{
          left: billingType === "monthly" ? "1px" : "50%",
          width: "calc(50% - 1px)",
        }}
      />
      <button
        onClick={() => setBillingType("monthly")}
        className={clsx(
          "relative px-3 py-1 rounded-full transition-colors z-10 w-18 cursor-pointer",
          billingType === "monthly"
            ? "text-black font-semibold"
            : "text-gray-500",
        )}
      >
        monthly
      </button>
      <button
        onClick={() => setBillingType("one_off")}
        className={clsx(
          "relative px-3 py-1 rounded-full transition-colors z-10 w-18 cursor-pointer",
          billingType === "one_off"
            ? "text-black font-semibold"
            : "text-gray-500",
        )}
      >
        one-off
      </button>
    </div>
  );
}
