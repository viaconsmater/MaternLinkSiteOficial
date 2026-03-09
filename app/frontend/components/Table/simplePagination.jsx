import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { router } from "@inertiajs/react";
import { Text } from "@switchdreams/ui";
import React from "react";

const SimplePagination = ({ hasMorePages }) => {
  const queryParams = Object.fromEntries(new URLSearchParams(window.location.search));

  return (
    <div className="flex h-20 w-full items-center justify-between gap-2 border-primary-100 bg-white px-6 text-primary-600 md:rounded-b-md md:border">
      <button
        className={`cursor-${
          !queryParams.page || queryParams.page === "1" ? "not-allowed" : "pointer"
        } flex items-center justify-center gap-2 rounded-md border border-primary-100 p-2 md:border-0 md:p-0`}
        onClick={() => {
          router.reload({
            data: { ...queryParams, page: Math.min(Number(queryParams.page || 1) - 1, 1) },
          });
        }}
        disabled={!queryParams.page || queryParams.page === "1"}
      >
        {<ArrowLeftIcon className="h-4 stroke-2 text-primary-600" />}
        <span className="hidden md:block">Anterior</span>
      </button>
      <div>
        <Text as="p" size="sm" className="flex gap-1 text-primary-700">
          Página
          <Text as="span" size="sm" className="font-semibold text-primary-800">
            {queryParams.page || 1}
          </Text>
        </Text>
      </div>
      <button
        className={`cursor-${
          hasMorePages ? "pointer" : "not-allowed"
        } flex items-center justify-center gap-2 rounded-md border border-primary-100 p-2 text-primary-800 md:border-0 md:p-0`}
        onClick={() => {
          if (hasMorePages)
            router.reload({
              data: { ...queryParams, page: Number(queryParams.page || 1) + 1 },
            });
        }}
        disabled={!hasMorePages}
      >
        <span className="hidden md:block">Próximo</span>
        {<ArrowRightIcon className="h-4 stroke-2" />}
      </button>
    </div>
  );
};

export default SimplePagination;
