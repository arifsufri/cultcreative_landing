"use client";

import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

const ContactInfoItem = ({ iconSrc, title, children }) => (
  <div className="flex items-center gap-[12px] md:gap-8">
    <div className="hidden md:block flex flex-shrink-0 bg-vibrant-purple p-6 rounded-3xl items-center justify-center">
      <Image src={iconSrc} alt={`${title} icon`} width={38} height={38} />
    </div>
    <div className="block md:hidden flex flex-shrink-0 bg-vibrant-purple p-4 rounded-[0.875rem] items-center justify-center">
      <Image src={iconSrc} alt={`${title} icon`} width={28.28} height={28.28} />
    </div>
    <div>
      <h3 className="text-base md:text-2xl font-aileron font-bold text-cc-onyx leading-tight tracking-[-0.06em]">
        {title}
      </h3>
      <div className="text-xs md:text-[15px] text-cc-onyx font-aileron font-normal leading-none tracking-[-0.06em]">
        {children}
      </div>
    </div>
  </div>
);

const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}) => (
  <div className="w-full">
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <input
      type={type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={required ? `${placeholder} *` : `${placeholder}`}
      className="w-full font-aileron font-[14px] font-normal text-cc-onyx bg-transparent border-0 border-b border-cc-dark-grey focus:border-transparent  py-2"
      required={required}
    />
  </div>
);

const initialFormState = {
  subject: "general-inquiry",
  companyName: "",
  workEmail: "",
  message: "",
};

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubjectChange = (subject) => {
    setFormData((prev) => ({ ...prev, subject }));
  };

  const formReset = () => {
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form Submitted:", formData);

    try {
      const response = await fetch("/api/submit-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        formReset();
      } else {
        toast.error(data.error || "Form submission failed. Please try again");
      }
    } catch (error) {
      toast.error("An unexpected error occured. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const subjects = [
    "General Inquiry",
    "About Creators",
    "About Brands",
    "Finance",
  ];

  return (
    <section className="flex flex-col bg-cover bg-center bg-no-repeat bg-contact-mobile pt-28 pb-10 md:pt-60 md:pb-40 md:bg-contact-desktop md:p-4  shadow-2xl">
      <div className="bg-cc-light-grey rounded-3xl md:rounded-[36px] p-6 md:px-20 py-[60px] md:py-[120px] mx-3 md:mx-6 z-10">
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-[2rem] md:text-[64px] font-aileron font-bold text-cc-onyx tracking-[-0.06em] leading-[0.8]">
            Drop Us A Line
          </h1>
          <p className="text-2xl md:text-5xl text-cc-onyx font-baskerville font-[400] italic tracking-[-0.04em] py-2">
            Creativity starts with a “hey.”
          </p>
        </div>

        {/* Main Content Grid */}
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-16"> */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10">
          {/* left: cult info */}
          <div className="hidden md:flex flex-col gap-3 md:gap-10 md:p-6">
            <ContactInfoItem
              iconSrc={"/images/NewContact/home_pin.svg"}
              title="Our Location"
            >
              <p>A-5-3A , Block A , Jaya One</p>
              <p>Jln Profesor Diraja Ungku Aziz Seksyen 13 , 46200</p>
              <p>Petaling Jaya , Selangor , Malaysia</p>
            </ContactInfoItem>
            <ContactInfoItem
              iconSrc={"/images/NewContact/mail.svg"}
              title="Email Address"
            >
              <p>hello@cultcreative.asia</p>
            </ContactInfoItem>
            <ContactInfoItem
              iconSrc={"/images/NewContact/phone.svg"}
              title="Phone Number"
            >
              <p>+60 17-869 8757</p>
            </ContactInfoItem>
          </div>

          {/* right: contact form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:bg-white rounded-[32px] justify-between"
          >
            <div className="space-y-8 md:py-6 md:px-12">
              <div>
                <h3 className="text-2xl md:text-2xl font-semibold text-cc-onyx mb-1 tracking-[-0.06em]">
                  Select Subject
                </h3>
                <div className="flex flex-col md:flex-row gap-x-6 gap-y-3">
                  {subjects.map((subject) => {
                    const id = subject.toLowerCase().replace(" ", "-");

                    return (
                      <div key={id} className="flex items-center">
                        <input
                          type="radio"
                          id={id}
                          name="subject"
                          value={id}
                          checked={formData.subject === id}
                          onChange={() => handleSubjectChange(id)}
                          className="h-4 w-4"
                        />
                        <label
                          htmlFor={id}
                          className="ml-2 font-aileron font-[12px] font-light text-cc-onyx"
                        >
                          {subject}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8">
                <FormInput
                  id="companyName"
                  label="Company Name"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
                <FormInput
                  id="workEmail"
                  label="Work Email"
                  type="email"
                  placeholder="Work Email"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Write your message...
                </label>
                <input
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full font-aileron font-[14px] font-normal text-cc-onyx bg-transparent border-0 border-b border-cc-dark-grey transition-colors py-2"
                ></input>
              </div>
            </div>

            <div className="text-center md:text-right pt-10 md:py-6 md:px-12">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-cc-blue text-white font-aileron font-bold py-4 px-4 md:px-16 w-full md:w-auto rounded-full hover:bg-blue-700 transition-colors duration-200"
              >
                {isLoading ? "Sending.." : "SEND MESSAGE"}
              </button>
            </div>
          </form>
          <div className="flex md:hidden flex-col gap-3 md:gap-10 md:p-6">
            <ContactInfoItem
              iconSrc={"/images/NewContact/home_pin.svg"}
              title="Our Location"
            >
              <p>A-5-3A , Block A , Jaya One</p>
              <p>Jln Profesor Diraja Ungku Aziz Seksyen 13 , 46200</p>
              <p>Petaling Jaya , Selangor , Malaysia</p>
            </ContactInfoItem>
            <ContactInfoItem
              iconSrc={"/images/NewContact/mail.svg"}
              title="Email Address"
            >
              <p>hello@cultcreative.asia</p>
            </ContactInfoItem>
            <ContactInfoItem
              iconSrc={"/images/NewContact/phone.svg"}
              title="Phone Number"
            >
              {/* <p>+60 16-267 8757</p> */}
              <p>+60 17-869 8757</p>
            </ContactInfoItem>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
