import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import { Text } from "@switchdreams/ui";
import React from "react";

// TODO: Add props to preserve page state on pagination (For filters)?
const Pagination = ({ pagy }) => {
  return (
    <div className="flex h-20 w-full items-center justify-between gap-2 border-primary-100 bg-white px-6 text-primary-600 md:rounded-b-md md:border">
      <button
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-primary-100 p-2 md:border-0 md:p-0"
        onClick={() => {
          router.visit(pagy.prev_url, { preserveScroll: true });
        }}
      >
        {<ArrowLeftIcon className="h-4 stroke-2 text-primary-600" />}
        <span className="hidden md:block">Anterior</span>
      </button>
      <div className="hidden gap-2 md:flex">
        {pagy.series.map((serie, index) => {
          const classNamePagination = `h-10 w-10 flex justify-center items-center rounded cursor-pointer`;

          if (typeof serie == "number") {
            const url = pagy.scaffold_url.replace("__pagy_page__", serie);
            return (
              <div key={index} className={classNamePagination} onClick={() => router.visit(url)}>
                {serie}
              </div>
            );
          }
          if (pagy.series[0] === "1" && serie !== "gap") {
            const url = pagy.scaffold_url.replace("__pagy_page__", "1");
            return (
              <div key={index} className={classNamePagination} onClick={() => router.visit(url)}>
                1
              </div>
            );
          }
          if (typeof pagy.series[pagy.series.length - 1] === "string" && serie !== "gap") {
            const url = pagy.scaffold_url.replace(
              "__pagy_page__",
              pagy.series[pagy.series.length - 1],
            );
            return (
              <div key={index} className={classNamePagination} onClick={() => router.visit(url)}>
                {pagy.series[pagy.series.length - 1]}
              </div>
            );
          } else {
            if (pagy.page.toString() === serie) {
              return (
                <div key={index} className={classNamePagination + " bg-primary-50"}>
                  {serie}
                </div>
              );
            } else {
              return (
                <div key={index} className={classNamePagination}>
                  ...
                </div>
              );
            }
          }
        })}
      </div>
      <div className="block md:hidden">
        <Text as="p" size="sm" className="flex gap-1 text-primary-700">
          Página
          <Text as="span" size="sm" className="font-semibold text-primary-800">
            {pagy.page}
          </Text>
          de
          <Text as="span" size="sm" className="font-semibold text-primary-800">
            {pagy.pages}
          </Text>
        </Text>
      </div>
      <button
        className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-primary-100 p-2 text-primary-800 md:border-0 md:p-0"
        onClick={() => router.visit(pagy.next_url)}
      >
        <span className="hidden md:block">Próximo</span>
        {<ArrowRightIcon className="h-4 stroke-2" />}
      </button>
    </div>
  );
};

export default Pagination;
