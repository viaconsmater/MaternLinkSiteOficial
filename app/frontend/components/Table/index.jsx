import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { twMerge } from "tailwind-merge";

import Pagination from "./pagination";
import SimplePagination from "./simplePagination";

const Table = ({
  data,
  columns,
  defaultMessage,
  classNameCell,
  classNameTable,
  classNameHeader,
  onClickRow,
  pagy,
  simplePagination = false,
  hasMorePages = false,
  infiniteScrollProps,
  selectedIds = [],
}) => {
  if (!data) {
    return defaultMessage;
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const cellClass = twMerge("px-6 py-4 text-sm font-semibold text-primary-600", classNameCell);
  const tableClass = twMerge("w-full overflow-hidden md:rounded-t-md shadow-lg", classNameTable);
  const headerClass = twMerge(
    "z-10 top-0 px-6 py-4 font-poppins font-regular text-sm text-coolGray-600 border-b border-gray-100 bg-white",
    classNameHeader,
  );

  const renderTable = () => {
    return (
      <table className={tableClass}>
        <thead className=" top-0 z-10 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={`${headerClass} text-center`}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`${
                selectedIds.includes(row.original.id) ? "bg-primary-100" : "bg-white"
              } ${onClickRow ? "cursor-pointer" : ""} h-fit border-b border-coolGray-300`}
              {...(onClickRow && { onClick: () => onClickRow(row.original) })}
            >
              {row.getVisibleCells().map((cell, index) => {
                return (
                  <td
                    key={cell.id}
                    className={`${cellClass} ${index === 0 ? "text-left" : "text-center"}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <>
      {infiniteScrollProps ? (
        <InfiniteScroll {...infiniteScrollProps}>{renderTable()}</InfiniteScroll>
      ) : (
        <div className="w-full overflow-x-auto">{renderTable()}</div>
      )}
      {pagy && <Pagination pagy={pagy} />}
      {!pagy && simplePagination && <SimplePagination hasMorePages={hasMorePages} />}
    </>
  );
};

export default Table;
