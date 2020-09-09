import React from "react";
import ImageComponent from '../components/ImageComponent'
import GridWallLoader from '../components/GridWallLoader'
import { GridImagesWrapper } from '../components/StyledComponents';

export default function Wallpapers(props) {
  const handleImageThumbs = (index, type, image) =>{
    return (index === 1 && type === 'top') || (index === 5 && type === 'top') ? image.path : image.thumbs.small
  }

  
  const ArrCards = (
    <>
      {props.loaded ? props.images.map((section, key) => {
        return (
          <GridImagesWrapper type={props.type} key={key}>
            {section.map((image, index) => {
              return (
                <ImageComponent key={image.id} stats={image} image={handleImageThumbs(index,props.type, image)} />
              );
            })}
            </GridImagesWrapper>
        );
      }):<GridWallLoader type={props.type}/>}
    </>
  );

  return <div>{ArrCards}</div>;
}
