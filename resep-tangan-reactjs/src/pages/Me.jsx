import React from "react";

// example
import TumisKangkung from "../assets/Tumis Kangkung.png";
import BlackHamburger from "../assets/Black Hamburger.png";
import ChickenFinger from "../assets/Chicken Finger.png";
import OmletMie from "../assets/Omlet Mie.png";
import Arnold from "../assets/arnold.png";

import Header from "../components/profile/Header";
import Information from "../components/profile/Information";
import recipe_details from "../json/recipe_details.json";
export default function Me() {
  console.log(recipe_details);
  return (
    <section className="profile h-screen">
      {/* HEADER */}
      <Header />

      {/* MAIN */}
      <main className="pb-10">
        <Information
          username={`Arnold Poernomo`}
          userImage={Arnold}
          banner={TumisKangkung}
          title={`Tumis Kangkung`}
          rating={`4.2`}
          view={`5.2 k`}
          description={`Kangkung si sayuran hijau yang tak hanya banyak manfaat tapi juga
          mudah diolah.`}
        />

        <Information
          username={`Aldiyes`}
          userImage={Arnold}
          banner={BlackHamburger}
          title={`Black Hamburger`}
          rating={`4.2`}
          view={`5.2 k`}
          description={`Seperti namanya, keunikannya terletak pada bun alias roti pada burger yang...`}
        />

        <Information
          username={`Aldiyes`}
          userImage={Arnold}
          banner={ChickenFinger}
          title={`Chicke Finger`}
          rating={`4.2`}
          view={`5.2 k`}
          description={`Chicken fingers memiliki bentuk khas yang dipotong kecil memanjang, kemudian...`}
        />

        <Information
          username={`Aldiyes`}
          userImage={Arnold}
          banner={OmletMie}
          title={`Omlet Mie`}
          rating={`4.2`}
          view={`5.2 k`}
          description={`Mie instan sering disebut kurang sehat karena tinggi garam dan hanya mengandung karbohidray saja...`}
        />
      </main>
    </section>
  );
}
