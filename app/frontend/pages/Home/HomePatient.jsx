import React from "react";

import FaqSection from "@/components/HomeSections/FaqSection";
import SignUpSection from "@/components/HomeSections/HomeDoctorSections/SignUpSection";
import AboutSection from "@/components/HomeSections/HomePatientSections/AboutSection";
import AppealSection from "@/components/HomeSections/HomePatientSections/AppealSection";
import BenefitsSection from "@/components/HomeSections/HomePatientSections/BenefitsSection";
import ClubSection from "@/components/HomeSections/HomePatientSections/clubSection";
import HeroSection from "@/components/HomeSections/HomePatientSections/HeroSection";
import InfoSection from "@/components/HomeSections/HomePatientSections/InfoSection";

import WhatsAppButton from "../../components/WhatsAppButton";

const HomePatient = ({ specialties_options, states_options, cities_by_state_options }) => { 
  return (
    <>
      <HeroSection cities_by_state={cities_by_state_options} states_options={states_options} clinicSpecialtiesOptions={specialties_options} />
      <AboutSection />
      <InfoSection />
      <AppealSection />
      <BenefitsSection />
      {/* <ClubSection /> */}
      <FaqSection />
      <SignUpSection />
      <WhatsAppButton />
    </>
  );
};

export default HomePatient;
