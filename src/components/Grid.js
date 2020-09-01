import React from "react";
import styled from "styled-components";

const GridSystem = styled.div`
  width: 100%;
  display: grid;
  grid-template-areas:
   "header"
   "sidebar"
   "content";

    @media only screen and (min-width: 500px)  {
        grid-template-columns: 25% auto;
        grid-template-areas:
                            "sidebar   header"
                            "sidebar  content";
    }

    @media only screen and (min-width: 600px)   {
        grid-template-columns: 15% auto 120px;
        grid-template-areas:
                        "sidebar  header  header"
                        "sidebar content content";
    }
`;

const GridNav = styled.div`
  background: #E9E9E9;
  grid-area: header;
`;
const GridSideNav = styled.div`
  background: #3A3A3A;
  grid-area: sidebar;
`;

const GridBo = styled.div`
  background: #FFFFFF;
  grid-area: content;
`;

export function Grid(props) {
  return <GridSystem>{props.children}</GridSystem>;
}
export function GridNavbar(props) {
  return <GridNav>{props.children}</GridNav>;
}
export function GridSideNavbar(props) {
  return <GridSideNav>{props.children}</GridSideNav>;
}
export function GridBody(props) {
  return <GridBo>{props.children}</GridBo>;
}
