import React from "react";

// example

import Arnold from "../assets/arnold.png";

import Header from "../components/profile/Header";
import Information from "../components/profile/Information";

import user_profile from "../json/user-profile.json";

function Me() {
  return (
    <section className="profile h-screen">
      {/* HEADER */}
      <Header username={`Arnold Poernomo`} userImage={Arnold} />

      {/* MAIN */}
      <main className="pb-10">
        {user_profile.recipes.map((data) => (
          <Information
            username={`Arnold Poernomo`}
            userImage={Arnold}
            banner={data.media.path}
            title={data.name}
            rating={data.rating}
            views={data.views}
            description={data.description}
          />
        ))}
      </main>
    </section>
  );
}

export default Me;
