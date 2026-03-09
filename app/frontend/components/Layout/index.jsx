import { usePage } from "@inertiajs/react";
import React from "react";

import { AlertProvider } from "@/contexts/Alert";

import Footer from "./Footer";
import Navbar from "./Navbar";

const DefaultLayout = ({ children }) => {
  const { currentUser } = usePage().props;
  return (
    <>
      <AlertProvider>
        <Navbar currentUser={currentUser} />
        <div
          className={`relative flex size-full min-h-screen flex-col items-center justify-start ${!currentUser || currentUser.active_plan ? "pt-16" : "pt-52"} ${!currentUser || currentUser.active_plan ? "lg:pt-20" : "lg:pt-36"}`}
        >
          {children}
        </div>
        <Footer />
      </AlertProvider>
    </>
  );
};

export default DefaultLayout;
