"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import useIsMobile from "@/app/[locale]/hooks/useIsMobile";

const SixthSection = () => {
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'my';
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: "",
    industry: "",
    budget: ""
  });

  const budgetOptions = locale === 'sg' ? [
    { value: "", label: "Monthly Influencer Budget (SGD)" },
    { value: "", label: "Select one..." },
    { value: "below-3k", label: "Below SGD3,000" },
    { value: "3k-8k", label: "SGD 3,000 - SGD8,000" },
    { value: "8k-15k", label: "SGD 8,000 - SGD15,000" },
    { value: "15k-25k", label: "SGD 15,000 - SGD25,000" },
    { value: "above-25k", label: "More than SGD25,000" }
  ] : [
    { value: "", label: "Monthly Influencer Budget (RM)" },
    { value: "", label: "Select one..." },
    { value: "below-3k", label: "Below RM3,000" },
    { value: "3k-8k", label: "RM3,000 - RM8,000" },
    { value: "8k-15k", label: "RM8,000 - RM15,000" },
    { value: "15k-25k", label: "RM15,000 - RM25,000" },
    { value: "above-25k", label: "More than RM25,000" }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          locale,
          formType: "landing",
        }),
      });

      if (response.ok) {
        toast.success("Form submitted successfully!");
        setFormData({
          name: "",
          phone: "",
          company: "",
          email: "",
          industry: "",
          budget: ""
        });
      } else {
        const error = await response.json();
        toast.error(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Failed to submit form");
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <style jsx>{`
        input::placeholder {
          font-family: Aileron;
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          line-height: 100%;
          letter-spacing: 0%;
          color: #9CA3AF;
        }
      `}</style>
      <section className="py-20 bg-white" style={{ contain: 'content' }}>
        <div className="container mx-auto px-6">
          {/* Desktop Layout */}
          <div className="w-full max-w-7xl mx-auto hidden md:block">
            <m.div
              className="overflow-hidden shadow-2xl w-full max-w-6xl mx-auto"
              style={{
                background: 'linear-gradient(45deg, #231F20 0%, #231F20 5%, #001A7A 20%, #001A7A 40%, #231F20 65%, #231F20 100%)',
                width: '100%',
                maxWidth: '1320px',
                height: '659px',
                borderRadius: '32px',
                padding: '80px',
                opacity: 1
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex justify-between h-full">
                {/* Left Column - Text Section */}
                <div className="flex flex-col justify-start relative pr-8" style={{ width: '40%', paddingTop: '0px' }}>
                  <h2
                    className="text-white mb-2"
                    style={{
                      fontFamily: 'Aileron, sans-serif',
                      fontWeight: 700,
                      fontSize: '48px',
                      lineHeight: '56px',
                      letterSpacing: '-0.06em',
                      color: '#FFFFFF'
                    }}
                  >
                    Finding Creators
                    <Image
                      src="/images/NewMain/singlestar.svg"
                      alt="Star decoration"
                      width={384}
                      height={384}
                      className="absolute top-0 right-0 w-96 h-96 transform -translate-y-52 translate-x-32 pointer-events-none"
                      loading="lazy"
                    />
                    <br />For Your Brand?
                  </h2>
                  <p
                    className="text-white"
                    style={{
                      fontFamily: 'Times New Roman, serif',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      fontSize: '24px',
                      lineHeight: '32px',
                      letterSpacing: '-0.04em',
                      color: '#FFFFFF'
                    }}
                  >
                    Fill in the form and we&apos;ll get in touch ASAP.
                  </p>
                </div>

                {/* Right Column - Form Section */}
                <div className="pl-8" style={{ width: '60%' }}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div className="pointer-events-auto cursor-text" onClick={(e) => e.currentTarget.querySelector('input')?.focus()}>
                      <div className="flex items-center mb-2 pointer-events-auto cursor-text" onClick={(e) => e.currentTarget.closest('div').querySelector('input')?.focus()}>
                        <Image src="/images/NewMain/ContactForm/Person.svg" alt="Person icon" width={20} height={20} className="w-5 h-5 mr-3 cursor-text" />
                        <label className="text-white text-sm cursor-text" onClick={(e) => e.currentTarget.closest('div').closest('div').querySelector('input')?.focus()}>Name</label>
                      </div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-white border-b border-white focus:border-blue-400 focus:outline-none py-3 cursor-text pointer-events-auto"
                        style={{
                          fontFamily: 'Aileron',
                          fontWeight: 400,
                          fontStyle: 'normal',
                          fontSize: '14px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          verticalAlign: 'middle',
                          WebkitAppearance: 'none',
                          appearance: 'none'
                        }}
                        required
                      />
                    </div>

                    {/* Phone Field */}
                    <div className="pointer-events-auto cursor-text" onClick={(e) => e.currentTarget.querySelector('input')?.focus()}>
                      <div className="flex items-center mb-2 pointer-events-auto cursor-text" onClick={(e) => e.currentTarget.closest('div').querySelector('input')?.focus()}>
                        <Image src="/images/NewMain/ContactForm/Phone.svg" alt="Phone icon" width={20} height={20} className="w-5 h-5 mr-3 cursor-text" />
                        <label className="text-white text-sm cursor-text" onClick={(e) => e.currentTarget.closest('div').closest('div').querySelector('input')?.focus()}>Phone Number</label>
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-white border-b border-white focus:border-blue-400 focus:outline-none py-3 cursor-text pointer-events-auto"
                        style={{
                          fontFamily: 'Aileron',
                          fontWeight: 400,
                          fontStyle: 'normal',
                          fontSize: '14px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          verticalAlign: 'middle',
                          WebkitAppearance: 'none',
                          appearance: 'none'
                        }}
                        required
                      />
                    </div>

                    {/* Company Field */}
                    <div className="pointer-events-auto cursor-text" onClick={(e) => e.currentTarget.querySelector('input')?.focus()}>
                      <div className="flex items-center mb-2 pointer-events-auto cursor-text" onClick={(e) => e.currentTarget.closest('div').querySelector('input')?.focus()}>
                        <Image src="/images/NewMain/ContactForm/Work outline.svg" alt="Work icon" width={20} height={20} className="w-5 h-5 mr-3 cursor-text" />
                        <label className="text-white text-sm cursor-text" onClick={(e) => e.currentTarget.closest('div').closest('div').querySelector('input')?.focus()}>Company Name</label>
                      </div>
                      <input
                        type="text"
                        name="company"
                        placeholder="Your Company Name"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-white border-b border-white focus:border-blue-400 focus:outline-none py-3 cursor-text pointer-events-auto"
                        style={{
                          fontFamily: 'Aileron',
                          fontWeight: 400,
                          fontStyle: 'normal',
                          fontSize: '14px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          verticalAlign: 'middle',
                          WebkitAppearance: 'none',
                          appearance: 'none'
                        }}
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div className="pointer-events-auto cursor-text" onClick={(e) => e.currentTarget.querySelector('input')?.focus()}>
                      <div className="flex items-center mb-2 pointer-events-auto cursor-text" onClick={(e) => e.currentTarget.closest('div').querySelector('input')?.focus()}>
                        <Image src="/images/NewMain/ContactForm/Email.svg" alt="Email icon" width={20} height={20} className="w-5 h-5 mr-3 cursor-text" />
                        <label className="text-white text-sm cursor-text" onClick={(e) => e.currentTarget.closest('div').closest('div').querySelector('input')?.focus()}>Business Email</label>
                      </div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Business Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-transparent text-white border-b border-white focus:border-blue-400 focus:outline-none py-3 cursor-text pointer-events-auto"
                        style={{
                          fontFamily: 'Aileron',
                          fontWeight: 400,
                          fontStyle: 'normal',
                          fontSize: '14px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          verticalAlign: 'middle',
                          WebkitAppearance: 'none',
                          appearance: 'none'
                        }}
                        required
                      />
                    </div>

                    {/* Dropdown Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="relative">
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className="w-full bg-white text-black rounded-3xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                          style={{
                            fontFamily: 'Aileron',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '14px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            verticalAlign: 'middle'
                          }}
                          required
                        >
                          <option value="">Select Industry</option>
                          <option value="banking">Banking and Finance</option>
                          <option value="beauty">Beauty</option>
                          <option value="lifestyle">Lifestyle</option>
                          <option value="health">Health and Wellness</option>
                          <option value="food">F&B</option>
                          <option value="fashion">Fashion</option>
                          <option value="charities">Charities and NGOs</option>
                          <option value="education">Education</option>
                          <option value="events">Events</option>
                          <option value="motherhood">Motherhood and Family</option>
                          <option value="hotel">Hotel and Travel</option>
                          <option value="jewellery">Jewellery</option>
                          <option value="footwear">Footwear</option>
                          <option value="art">Art</option>
                          <option value="tech">Technology</option>
                          <option value="other">Others</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                          <svg className="w-4 h-4" fill="none" stroke="#231f20" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      <div className="relative">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="w-full bg-white text-black rounded-3xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                          style={{
                            fontFamily: 'Aileron',
                            fontWeight: 400,
                            fontStyle: 'normal',
                            fontSize: '14px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            verticalAlign: 'middle'
                          }}
                          required
                        >
                          {budgetOptions.map((option, idx) => (
                            <option key={idx} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                          <svg className="w-4 h-4" fill="none" stroke="#231f20" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 flex justify-center">
                      <button
                        type="submit"
                        className="w-64 text-white font-bold py-4 px-8 rounded-3xl transition-colors duration-200"
                        style={{
                          backgroundColor: '#1340ff',
                          fontFamily: 'Aileron',
                          fontWeight: 700,
                          fontStyle: 'normal',
                          fontSize: '16px',
                          lineHeight: '100%',
                          letterSpacing: '0%',
                          textAlign: 'center',
                          verticalAlign: 'middle'
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </m.div>
          </div>

          {/* Mobile Layout */}
          <div className="w-full max-w-sm mx-auto md:hidden">
            <m.div
              className="overflow-hidden shadow-2xl w-full"
              style={{
                background: 'linear-gradient(45deg, #231F20 0%, #231F20 5%, #001A7A 20%, #001A7A 40%, #231F20 65%, #231F20 100%)',
                borderRadius: '24px',
                padding: '32px',
                opacity: 1
              }}
              initial={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{}}
              viewport={{ once: true }}
            >
              {/* Mobile Header */}
              <div className="mb-6">
                <h2
                  className="text-white mb-3 relative"
                  style={{
                    fontFamily: 'Aileron, sans-serif',
                    fontWeight: 700,
                    fontSize: '28px',
                    lineHeight: '34px',
                    letterSpacing: '-0.06em',
                    color: '#FFFFFF'
                  }}
                >
                  Finding Creators For Your Brand?
                </h2>
                <p
                  className="text-white"
                  style={{
                    fontFamily: 'Times New Roman, serif',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    fontSize: '16px',
                    lineHeight: '22px',
                    letterSpacing: '-0.04em',
                    color: '#FFFFFF'
                  }}
                >
                  Fill in the form and we&apos;ll get in touch ASAP.
                </p>
              </div>

              {/* Mobile Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <div className="flex items-center mb-2">
                    <Image src="/images/NewMain/ContactForm/Person.svg" alt="Person icon" width={20} height={20} className="w-5 h-5 mr-3" />
                    <label className="text-white text-sm">Name</label>
                  </div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-white border-b border-white focus:border-blue-400 focus:outline-none py-2 cursor-text"
                    style={{
                      fontFamily: 'Aileron',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '14px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      WebkitAppearance: 'none',
                      appearance: 'none'
                    }}
                    required
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <div className="flex items-center mb-2">
                    <Image src="/images/NewMain/ContactForm/Phone.svg" alt="Phone icon" width={20} height={20} className="w-5 h-5 mr-3" />
                    <label className="text-white text-sm">Phone Number</label>
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-white border-b border-white focus:border-blue-400 focus:outline-none py-2 cursor-text"
                    style={{
                      fontFamily: 'Aileron',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '14px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      WebkitAppearance: 'none',
                      appearance: 'none'
                    }}
                    required
                  />
                </div>

                {/* Company Field */}
                <div>
                  <div className="flex items-center mb-2">
                    <Image src="/images/NewMain/ContactForm/Work outline.svg" alt="Work icon" width={20} height={20} className="w-5 h-5 mr-3" />
                    <label className="text-white text-sm">Company Name</label>
                  </div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Your Company Name"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-white border-b border-white focus:border-blue-400 focus:outline-none py-2 cursor-text"
                    style={{
                      fontFamily: 'Aileron',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '14px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      WebkitAppearance: 'none',
                      appearance: 'none'
                    }}
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <div className="flex items-center mb-2">
                    <Image src="/images/NewMain/ContactForm/Email.svg" alt="Email icon" width={20} height={20} className="w-5 h-5 mr-3" />
                    <label className="text-white text-sm">Business Email</label>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Business Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent text-white border-b border-white focus:border-blue-400 focus:outline-none py-2 cursor-text"
                    style={{
                      fontFamily: 'Aileron',
                      fontWeight: 400,
                      fontStyle: 'normal',
                      fontSize: '14px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      verticalAlign: 'middle',
                      WebkitAppearance: 'none',
                      appearance: 'none'
                    }}
                    required
                  />
                </div>

                {/* Dropdown Fields - Full Width on Mobile */}
                <div className="space-y-4">
                  <div className="relative">
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="w-full bg-gray-200 text-black rounded-2xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      style={{
                        fontFamily: 'Aileron',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '14px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        verticalAlign: 'middle'
                      }}
                      required
                    >
                      <option value="">Select Industry</option>
                      <option value="banking">Banking and Finance</option>
                      <option value="beauty">Beauty</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="health">Health and Wellness</option>
                      <option value="food">F&B</option>
                      <option value="fashion">Fashion</option>
                      <option value="charities">Charities and NGOs</option>
                      <option value="education">Education</option>
                      <option value="events">Events</option>
                      <option value="motherhood">Motherhood and Family</option>
                      <option value="hotel">Hotel and Travel</option>
                      <option value="jewellery">Jewellery</option>
                      <option value="footwear">Footwear</option>
                      <option value="art">Art</option>
                      <option value="tech">Technology</option>
                      <option value="other">Others</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="#231f20" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div className="relative">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full bg-gray-200 text-black rounded-2xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                      style={{
                        fontFamily: 'Aileron',
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '14px',
                        lineHeight: '100%',
                        letterSpacing: '0%',
                        verticalAlign: 'middle'
                      }}
                      required
                    >
                      {budgetOptions.map((option, idx) => (
                        <option key={idx} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="#231f20" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-center">
                  <button
                    type="submit"
                    className="w-full text-white font-bold py-4 px-8 rounded-2xl transition-colors duration-200"
                    style={{
                      backgroundColor: '#1340ff',
                      fontFamily: 'Aileron',
                      fontWeight: 700,
                      fontStyle: 'normal',
                      fontSize: '16px',
                      lineHeight: '100%',
                      letterSpacing: '0%',
                      textAlign: 'center',
                      verticalAlign: 'middle'
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </m.div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default SixthSection;
