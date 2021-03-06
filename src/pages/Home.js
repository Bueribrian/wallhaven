import React, { useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { Link } from "react-router-dom";
import { SectionHeader } from "../components/StyledComponents";
import Wallpapers from "../components/Wallpapers";

export default function Home() {
  // const { images, mostviewed, topImages, topImagesLoaded,  mostViewedLoaded } = useContext(SearchContext)
  const {
    images,
    mostviewed,
    topImages,
    topImagesLoaded,
    mostViewedLoaded,
    imagesLoaded,
    favs
  } = useContext(SearchContext);

  useEffect(() => {},[favs])

  return (
    <div>
      <SectionHeader
        background="patriarch"
        xaling="space-between"
        yaling="center"
        color="white"
      >
        <h2>Top images</h2>
        <Link to="/search/top">View more</Link>
      </SectionHeader>
      <Wallpapers type="top" load={topImagesLoaded} images={topImages} />
      <SectionHeader
        background="viviDangerine"
        xaling="space-between"
        yaling="center"
        color="white"
      >
        <h2>Most viewed</h2>
        <Link to="/search/mostViewed">View more</Link>
      </SectionHeader>
      <Wallpapers
        size="8"
        type="default"
        load={mostViewedLoaded}
        images={mostviewed}
      />
      <SectionHeader
        background="pacificBlue"
        xaling="space-between"
        yaling="center"
        color="white"
      >
        <h2>General Images</h2>
        <Link to="/search/general">View more</Link>
      </SectionHeader>
      <Wallpapers
        size="8"
        type="default"
        load={imagesLoaded}
        images={images}
      />
    </div>
  );
}
