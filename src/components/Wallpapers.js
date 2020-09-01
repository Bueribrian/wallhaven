import React from "react";
import { Link } from "react-router-dom";
import ImageComponent from '../components/ImageComponent'
import { GridImagesWrapper } from '../components/StyledComponents';

export default function Wallpapers(props) {

  const ArrCards = (
    <>
      {props.images.map((section, key) => {
        return (
          <GridImagesWrapper type={props.type} key={key}>
            {section.map((image, index) => {
              return (
                <ImageComponent key={image.id} stats={image} image={index === 1 && props.type === 'top' || index === 5 && props.type === 'top' ? image.path : image.thumbs.small} />
              );
            })}
            </GridImagesWrapper>
        );
      })}
    </>
  );

  return <div>{ArrCards}</div>;
}
