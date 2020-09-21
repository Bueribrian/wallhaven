import React from "react";
import ImageComponent from "../components/ImageComponent";
import GridWallLoader from "../components/GridWallLoader";
import { GridImagesWrapper } from "../components/StyledComponents";

export default function Wallpapers(props) {
  const handleImageThumbs = (index, type, image) => {
    return (index === 1 && type === "top") || (index === 5 && type === "top")
      ? image.path
      : image.thumbs.small;
  };

  let { type, loaded, images} = props;

  let size = props.size !== undefined ? parseInt(props.size) - 1 : 23;


  const ArrCards = (
    <>
      {loaded ? (
        images.map((section, key) => {
          return (
            <div key={key}>
              <GridImagesWrapper type={type} >
                {section.map((image, index) => {
                  if (size >= index) {
                    return (
                      <ImageComponent
                        key={image.id}
                        stats={image}
                        image={handleImageThumbs(index, props.type, image)}
                      />
                    );
                  }
                  return null;
                })}
              </GridImagesWrapper>

            </div>
          );
        })
      ) : 
        ((images.length  === 0 && loaded) ? 'No hay imagenes' : <GridWallLoader type={type} /> )
        
      }
    </>
  );

  return <div>{ArrCards}</div>;
}
