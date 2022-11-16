import React from "react";
import { Icon } from "@iconify/react";

export default function Search() {
  return (
    <div
      className={`input flex items-center border border-gray-400 rounded-md my-5 h-12 pl-4`}
    >
      <input
        className="flex-grow pr-2 bg-transparent outline-none placeholder:italic"
        type="text"
        placeholder="Pencarian..."
        name="search"
      />
      <Icon
        icon="ic:outline-search"
        className="cursor-pointer h-full w-7 text-black md:hidden"
      />
    </div>
  );
}
