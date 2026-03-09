import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button } from "@switchdreams/ui";
import React from "react";

const Pagination = ({ page, setPage, getData, maxPages }) => {
  return (
    <div className="my-4 flex justify-center gap-0">
      <Button
        className="w-24 rounded-l-lg rounded-r-none md:hidden"
        variant="outline"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
            getData(page - 1);
          }
        }}
        disabled={page == 1}
        icon={ChevronLeftIcon}
        iconSide="left"
      />
      <Button
        label={"Anterior"}
        className="w-24 rounded-l-lg rounded-r-none max-md:hidden"
        variant="outline"
        onClick={() => {
          if (page > 1) {
            setPage(page - 1);
            getData(page - 1);
          }
        }}
        disabled={page == 1}
        icon={ChevronLeftIcon}
        iconSide="left"
      />
      {Array.from({ length: maxPages + 1 }, (_, i) => i).map((i) => {
        if (i == page && i > 0) {
          return <Button label={i} key={i} className="w-12 rounded-none" />;
        } else if (i == 1) {
          return (
            <div className="flex flex-row" key={i}>
              <Button
                label={i}
                className="w-12 rounded-none"
                variant="outline"
                onClick={() => {
                  setPage(i);
                  getData(i);
                }}
              />
              <Button
                label="..."
                className="w-12 cursor-default rounded-none max-md:hidden"
                variant="outline"
              />
            </div>
          );
        } else if (i == maxPages) {
          return (
            <div className="flex flex-row" key={i}>
              <Button
                label="..."
                className="w-12 cursor-default rounded-none max-md:hidden"
                variant="outline"
              />
              <Button
                label={i}
                className="w-12 rounded-none"
                variant="outline"
                onClick={() => {
                  setPage(i);
                  getData(i);
                }}
              />
            </div>
          );
        } else if ((i == page - 1 || i == page + 1) && i > 0) {
          return (
            <Button
              key={i}
              label={i}
              className="w-12 rounded-none max-md:hidden"
              variant="outline"
              onClick={() => {
                setPage(i);
              }}
            />
          );
        }
      })}
      <Button
        label={"Próximo"}
        className="w-24 rounded-l-none rounded-r-lg max-md:hidden"
        variant="outline"
        onClick={() => {
          if (page < maxPages) {
            setPage(page + 1);
            getData(page + 1);
          }
        }}
        disabled={page == maxPages}
        icon={ChevronRightIcon}
        iconSide="right"
      />
      <Button
        className="w-24 rounded-l-none rounded-r-lg md:hidden"
        variant="outline"
        onClick={() => {
          if (page < maxPages) {
            setPage(page + 1);
            getData(page + 1);
          }
        }}
        disabled={page == maxPages}
        icon={ChevronRightIcon}
        iconSide="right"
      />
    </div>
  );
};

export default Pagination;
