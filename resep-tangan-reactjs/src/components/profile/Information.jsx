import React from "react";

import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

function Information({
  title,
  banner,
  rating,
  views,
  description,
  userImage,
  username,
}) {
  return (
    <>
      <div className="container grid grid-cols-12 my-5">
        {/* left side */}
        <div className="navigation col-span-5 items-center">
          {/* image */}
          <div className="image  flex justify-center">
            <img
              src={banner}
              alt={title}
              className="w-25 rounded-md shadow-[5px_7px_15px_rgba(0,0,0,0.25)]"
            />
          </div>
          {/* button */}
          <div className="button-navigation mt-4 flex justify-around  text-center">
            <Link
              to=""
              className="btn block bg-blue-400 h-[22px] w-[55px] hover:bg-blue-500 hover:shadow-[2px_4px_5px_rgba(0,0,0,0.35)] transiton duration-300 ease-in font-medium rounded-md text-white text-sm"
            >
              Edit
            </Link>
            <Link
              to=""
              className="btn block bg-red-400 h-[22px] w-[55px] hover:bg-red-500 hover:shadow-[2px_4px_5px_rgba(0,0,0,0.35)] transiton duration-300 ease-in font-medium rounded-md text-white text-sm"
            >
              Delete
            </Link>
          </div>
        </div>
        {/* right side */}
        <div className="information col-span-7 pl-5 flex flex-col gap-3">
          {/* title */}
          <h1 className="title font-poppins font-medium text-sm">{title}</h1>
          {/* rating */}
          <div className="box-rating rating flex gap-2 items-center">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400 w-3 h-3"
            />
            <p className="text-[8px] italic font-sans">{rating}</p>
          </div>
          {/* view */}
          <div className="box-view view flex gap-2 items-center">
            <Icon icon="akar-icons:eye" className="w-3 h-3" />
            <p className="text-[8px] italic font-sans">{views}</p>
          </div>
          {/* user */}
          <div className="user flex items-center gap-2">
            {/* image */}
            <div className="image">
              <img
                src={userImage}
                alt={username}
                className="h-7 w-7 rounded-full"
              />
            </div>
            {/* name */}
            <p className="username font-inter font-medium text-[10px]">
              {username}
            </p>
          </div>
          {/* description */}
          <p className="description text-gray-500 text-[10px] font-regular font-poppins">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}

export default Information;
