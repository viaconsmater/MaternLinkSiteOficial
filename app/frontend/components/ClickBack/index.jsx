import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import React from "react";

const ClickBack = ({ onClickBack }) => {
  return (
    <div className="absolute left-[5%] top-24 z-20 md:left-28 md:top-32 md:block">
      <div
        onClick={onClickBack}
        className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-primary-50 hover:border-primary-200 hover:bg-primary-25 "
      >
        <ArrowLongLeftIcon className="block size-5 stroke-2 text-primary-500 " />
      </div>
    </div>
  );
};

export default ClickBack;
