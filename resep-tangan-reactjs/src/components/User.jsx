import React from "react";
import Arnold from "../assets/arnold.png";
import { Icon } from "@iconify/react";
export default function User() {
  return (
    <div className="grid grid-rows-2 grid-flow-col">
      <div className="image row-span-2 col-span-1 rounded-full border-primary">
        <img src={Arnold} alt={`Arnold Poernomo`} />
      </div>
      <div className="box col-span-5">
        <div className="name text-xs font-medium font-sans">{`Arnold  Poernomo`}</div>
        <div className="ratting-view gap-5 flex items-center">
          <div className="box-rating flex gap-2 items-center">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400 w-3 h-3"
            />
            <p className="text-small italic font-sans">4.2</p>
          </div>
          <div className="box-view flex gap-2 items-center">
            <Icon icon="akar-icons:eye" className="w-3 h-3" />
            <p className="text-small italic font-sans">5.2 k</p>
          </div>
        </div>
      </div>
    </div>
  );
}
