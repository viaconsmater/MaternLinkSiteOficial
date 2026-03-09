import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FaceSmileIcon,
  HeartIcon,
  // StarIcon,
} from "@heroicons/react/24/outline";
import { router, usePage } from "@inertiajs/react";
import { Avatar, Text } from "@switchdreams/ui";
import React, { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Modal from "@/components/Modal";
import { useAlert } from "@/contexts/Alert";
import {
  extractTime,
  formatIntegerCurrency,
  imagePath,
  monthsTranslated,
  monthsTranslatedAbreviation,
  weekDaysTranslated,
} from "@/utils";

const SimpleClinicCard = (props) => {

  return (
    <ErrorBoundary fallback={<div>Aconteceu algum problema para exibir a clínica...</div>}>
        <div class="w-full px-6 py-2 border-b border-[#eaecf0]">
          <div className="justify-start items-center gap-5 inline-flex">
            <div className="rounded-full flex-col justify-center items-center gap-2 inline-flex">
              <div className=" justify-center items-center inline-flex">
                <Avatar
                  size="lg"
                  name={props.name}
                  avatarUrl={props.image}
                  className="bg-primary-25"
                />
              </div>
            </div>
            <div className="flex-col justify-center items-start inline-flex">
              <div className="self-stretch h-5 justify-start items-center gap-1 inline-flex">
                <div className="text-[#101828] text-md font-bold font-['Quicksand'] ">{props.name}</div>
              </div>
              <div className="self-stretch text-[#667085] text-sm font-normal font-['Poppins'] leading-snug">{props.specialty}</div>
            </div>
          </div>
        </div>
    </ErrorBoundary>
  );
};

export default SimpleClinicCard;
