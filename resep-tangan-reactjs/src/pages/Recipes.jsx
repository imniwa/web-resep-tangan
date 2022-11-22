import React from "react";
import Search from "../components/Search";
import Recipe_details from "../json/recipe_details.json";
import User from "../components/User";
import Materials from "../components/recipes/Materials";
import Steps from "../components/recipes/Steps";

function Recipes() {
  const details = Recipe_details.recipe;
  return (
    <section className="recipe-details h-screen">
      <div className="container">
        <Search />

        {/* banner */}
        <h1 className="title text-2xl">{details.title}</h1>
        <img src={details.banner.path} alt={details.title} />
      </div>

      {/* user */}
      <User />

      {/* details */}
      <p>{details.description}</p>

      {/* materials */}
      <p>bahan - bahan</p>
      <Materials materials={details.materials} />

      {/* steps */}
      <Steps steps={details.contents} />
    </section>
  );
}

export default Recipes;
