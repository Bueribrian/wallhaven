import React from "react";
import WallLoader from "./WallLoader";
import { GridImagesWrapper } from "../components/StyledComponents";

export default function GridWallLoader(props) {
  return (
    <GridImagesWrapper type={props.type} >
      {props.type === "top" ? (
        <>
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
        </>
      ) : (
        <>
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
          <WallLoader />
        </>
      )}
    </GridImagesWrapper>
  );
}
