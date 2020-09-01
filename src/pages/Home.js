import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeProvider";
import { Link } from "react-router-dom";
import { SectionHeader } from '../components/StyledComponents'
import Wallpapers from "../components/Wallpapers";

export default function Home() {
  const { images, mostviewed, topImages } = useContext(SearchContext)


  return (
    <div>
      <SectionHeader background='#6B2AB5' xaling='space-between' yaling='center' color='white'>
        <h2>Top images</h2>
        <Link to='/top'>View more</Link>
      </SectionHeader>
      <Wallpapers type='top' images={topImages} />
      <SectionHeader background='#569FFF' xaling='space-between' yaling='center' color='white'>
        <h2>Most viewed</h2>
        <Link to='/popular'>View more</Link>
      </SectionHeader>
      <Wallpapers type='default' images={mostviewed} />
    </div>
  );
}
