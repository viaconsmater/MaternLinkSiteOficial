import React from "react";

import FaqSection from "@/components/HomeSections/FaqSection";
import AboutSection from "@/components/HomeSections/HomeDoctorSections/AboutSection";
import AppealSection from "@/components/HomeSections/HomeDoctorSections/AppealSection";
import BenefitsSection from "@/components/HomeSections/HomeDoctorSections/BenefitsSection";
import HeroSection from "@/components/HomeSections/HomeDoctorSections/HeroSection";
import InfoSection from "@/components/HomeSections/HomeDoctorSections/InfoSection";
import SignUpSection from "@/components/HomeSections/HomePatientSections/SignUpSection";
import PaymentSection from "~/components/HomeSections/HomeDoctorSections/PaymentSection";

import WhatsAppButton from "../../components/WhatsAppButton";

const HomeDoctor = () => {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <InfoSection />
      <AppealSection />
      <AboutSection />
      <PaymentSection />
      <FaqSection />
      <SignUpSection />
      <WhatsAppButton />
    </>
  );
};

export default HomeDoctor;
