import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/StyledComponents";
import axios from "axios";

let Grid = styled.div`
  padding: 2rem 5rem 5rem 5rem;
  display: grid;
  grid-template-columns: 1fr 7fr;
  grid-template-rows: auto;
  grid-gap: 1rem;
  min-height: 100vh;
  height: 100%;
  width: 100%;

  & .wall-info{
    grid-column: 1/2;
    grid-row: 1/-1;
  }
  & .wall-image{
    grid-column: 2/3;
    grid-row: 1/2;
    display:flex;
    justify-content: center;
    align-items: center;

    & img {
      max-width: 100%;
      max-height: 100%;  
      object-fit:contain:
    }
  }
  & .wall-download{
    grid-column: 2/-1;
    grid-row: 2/-1;
  }

`;

export default function Wall() {
  const [wallpaperData, setWallpaperData] = useState({
    loaded: false,
    data: null,
  });
  let { wallid } = useParams();

  const getImage = () => {
    axios
      .get(`https://wallhaven-api.herokuapp.com/search/wall/${wallid}`)
      .then((response) => {
        console.log(response.data.data);
        return setWallpaperData({ loaded: true, data: response.data.data });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid>
      {wallpaperData.loaded ? (
        <>
          {" "}
          <div className="wall-info">
            <div>
              <div className="colors-boxes my-2" style={{ display: "flex" }}>
                <h3>Colors:</h3>
                <div>
                  {wallpaperData.data["colors"].map((color) => (
                    <div
                      style={{
                        background: color,
                        width: "100px",
                        height: "40px",
                        padding: ".5rem",
                        margin: ".5rem",
                        color: "#fff",
                        fontWeight: "bold",
                        borderRadius: "8px",
                      }}
                    >
                      {color}
                    </div>
                  ))}
                </div>
              </div>
              <div className="my-2">
                <h3>Category:</h3>
                <div>{wallpaperData.data.category}</div>
              </div>
              <div className="my-2">
                <h3>Resolution:</h3>
                <div>{wallpaperData.data.resolution}</div>
              </div>
            </div>
          </div>
          <div className="wall-image">
            {<img src={wallpaperData.data.path} alt="wallpapaer" />}
          </div>
          <div className="wall-download d-flex">
            {Object.keys(wallpaperData.data.thumbs).map((thumb, index) => (
              <a href={wallpaperData.data.thumbs[thumb]} download="">
                <Button>Download {thumb} size</Button>
              </a>
            ))}
          </div>
        </>
      ) : (
        "...cargando"
      )}
    </Grid>
  );
}
