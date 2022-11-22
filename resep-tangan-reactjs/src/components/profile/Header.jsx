import React from "react";
import { Icon } from "@iconify/react";

function Header({ username, userImage }) {
  return (
    <header className="py-2 border-b-2 border-primary top-0 sticky bg-white">
      <div className="container flex justify-between items-center">
        <Icon
          icon="material-symbols:arrow-back"
          className=" border-primary rounded-full text-primary h-8 w-8 cursor-pointer"
        />
        <div className="user flex items-center gap-3">
          <p className="font-inter font-medium">{username}</p>
          <div className="image">
            <img
              src={userImage}
              alt={username}
              className="h-10 w-10 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
