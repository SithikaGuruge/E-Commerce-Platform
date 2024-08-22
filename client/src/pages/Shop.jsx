import React from "react";
import Hero from "../components/Home/Hero";
import Popular from "../components/Popular/popular";
import Offers from "../components/Offers/Offers";
import NewCollections from "../components/New Collection/NewCollectios";

export default function Shop() {
  return (
    <div className="flex flex-col">
      <Hero />

      <NewCollections />
      <Offers />
      <Popular />
    </div>
  );
}
