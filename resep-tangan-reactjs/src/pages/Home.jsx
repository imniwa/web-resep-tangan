import React from "react";
import Search from "../components/Search";
import { Icon } from "@iconify/react";
import User from "../components/User";

function Home() {
  return (
    <main>
      <div className="container">
        <Search />

        {/* KATEGORI */}
        <p className="font-bold text-xs font-sans">Kategori</p>
        <div className="popular my-4 w-full grid grid-cols-4 gap-4">
          <div className="box w-16 h-16 shadow-xl text-sm flex flex-col items-center">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400 w-6 h-6"
            />
            Popular
          </div>

          <div className="box w-16 h-16 shadow-xl text-sm flex flex-col items-center">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400 w-6 h-6"
            />
            Popular
          </div>

          <div className="box w-16 h-16 shadow-xl text-sm flex flex-col items-center">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400 w-6 h-6"
            />
            Popular
          </div>

          <div className="box w-16 h-16 shadow-xl text-sm flex flex-col items-center">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400 w-6 h-6"
            />
            Popular
          </div>

          <div className="box w-16 h-16 shadow-xl text-sm flex flex-col items-center">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400 w-6 h-6"
            />
            Popular
          </div>

          <div className="box w-16 h-16 shadow-xl text-sm flex flex-col items-center">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400 w-6 h-6"
            />
            Popular
          </div>

          <div className="box w-16 h-16 shadow-xl text-sm flex flex-col items-center">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400 w-6 h-6"
            />
            Popular
          </div>

          <div className="box w-16 h-16 shadow-xl text-sm flex flex-col items-center">
            <Icon
              icon="material-symbols:star"
              className="text-yellow-400 w-6 h-6"
            />
            Popular
          </div>
        </div>

        {/* PENGGUNA TERATAS */}
        <p className="font-bold text-xs mb-4 font-sans">Pengguna Teratas</p>
        <User />
      </div>
    </main>
  );
}

export default Home;
