import React from "react";
import styled from "styled-components";

const ButtonDiv = styled.button`
  border: none;
  padding: .4rem 1.2rem;
  background:red;
  color: #fff;
  font-weight:400;
  letter-spacing:1.2px;
  display:flex;
  justify-content:center;
  align-items: center;
  cursor: pointer;
  margin-right: .5rem;
  max-width: 210px;
  height: 40px;
  text-align: center;

  * > {
    margin: 0rem .2rem;
  }
`;

const handleGrid = (type) => {
  switch (type) {
    case "top":
      console.log("entre?");
      return `grid-template-columns: repeat(auto-fill, minmax(320px, 320px) ); 
              & div:nth-child(2){
                  grid-row: span 2;
                  grid-column: span 2;
              }
              & div:nth-child(6){
                grid-column: span 2 ;
            }
              `;
    default:
      return "grid-template-columns: repeat(auto-fill, minmax(320px, 320px) );";
  }
};

const handleCategoryBadge = (category) => {
  switch(category) {
    case "anime":
      return "green";
    case "general":
      return "salmon";

    default:
      return "crimson";
  }
}

const BadgeComponent = styled.div`
  width:fit-content;
  padding: 0.3rem 0.5rem;
  text-align: center;
  color: #fff;
  font-weight: bold;
  letter-spacing: 0.5px;
  border-radius: 8px;

  & a {
    text-decoration: none;
    color: ${props => props.color ? props.color : '#fff'}
  }
  background:${props => props.category ? handleCategoryBadge(props.category) : props.background};

`;

const GridImagesWrap = styled.div`
  max-width: 1500px;
  margin: 1rem auto;
  display: grid;
  grid-gap: 0.4rem;
  justify-content: center;
  grid-auto-rows: 220px;
  ${(props) => handleGrid(props.type)}
`;

const SectionHeaderComponent = styled.div`
  width: 100%;
  height: 80px;
  background: ${(props) => props.background};
  display: flex;
  padding: 0rem 3em;
  justify-content: ${(props) => props.xaling};
  align-items: ${(props) => props.yaling};
  color: ${(props) => props.color};
  h2 {
    font-size: 2rem;
    font-weight: 200;
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  }
  & a {
    color: ${(props) => props.color};
  }
`;

export function Button(props) {
  return <ButtonDiv onClick={props.onClick} align={props.align}>{props.children}</ButtonDiv>;
}
export function GridImagesWrapper(props) {
  return <GridImagesWrap type={props.type}>{props.children}</GridImagesWrap>;
}

export function Badge(props) {
  return (
    <BadgeComponent background={props.background} category={props.category}>
      {props.children}
    </BadgeComponent>
  );
}

export function SectionHeader({ background, xaling, yaling, color, children }) {
  return (
    <SectionHeaderComponent
      background={background}
      xaling={xaling}
      yaling={yaling}
      color={color}
    >
      {children}
    </SectionHeaderComponent>
  );
}
