import React from "react";
import styled from "styled-components";
import colorSchema from "../colorSchema"

const handleBackground = (bg) => {
  let background = bg
  switch(bg){
    case 'warning':
      background = '#fffb17';
      break;
    case 'info':
      background = '#17aaff';
      break;
    case 'danger':
      background = '#fc4e42';
      break
    case 'success':
      background = '#17ff9e';
      break;

    default:
      background = '#5e5e5e';
      break;
  }

  return background
}


const ButtonDiv = styled.button`
  background:${(props) => handleBackground(props.background)};
  border: none;
  padding: 12px 28px;
  color: #fff;
  font-weight:400;
  letter-spacing:1.2px;
  display:inline-block;
  cursor: pointer;
  margin-right: .5rem;
  text-align: center;

  * > {
    margin: 0rem .2rem;
  }
`;

const handleGrid = (type) => {
  switch (type) {
    case "top":
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
      return colorSchema.buff;
    case "general":
      return colorSchema.blue;

    default:
      return colorSchema.blue;
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
  grid-gap: 0.1rem;
  justify-content: center;
  aling-items: center;
  grid-auto-rows: 220px;
  ${(props) => handleGrid(props.type)}
`;

const SectionHeaderComponent = styled.div`
  width: 100%;
  height: 80px;
  background: ${(props) => colorSchema[props.background] || colorSchema.blue};
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
  return <ButtonDiv onClick={props.onClick} background={props.background} align={props.align}>{props.children}</ButtonDiv>;
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
