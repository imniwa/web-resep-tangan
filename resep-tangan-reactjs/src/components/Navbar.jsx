import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

function Navbar() {
  return (
    <div className="flex fixed bottom-0 lg:top-0 bg-primary w-full h-12 px-10 justify-between items-center">
      <Link to="/">
        <Icon
          icon="ri:home-line"
          className="cursor-pointer h-full w-7 text-white md:hidden"
        />
      </Link>
      <Link to="">
        <Icon
          icon="ic:outline-search"
          className="cursor-pointer h-full w-7 text-white md:hidden"
        />
      </Link>
      <Link to="">
        <Icon
          icon="ic:sharp-star-border"
          className="cursor-pointer h-full w-7 text-white md:hidden"
        />
      </Link>
      <Link to="/me">
        <Icon
          icon="mdi:user"
          className="cursor-pointer h-full w-7 text-white md:hidden"
        />
      </Link>
    </div>
  );
}

export default Navbar;
