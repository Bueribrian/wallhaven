import React, { useEffect, useState, useContext } from "react";
import {SearchContext} from '../context/SearchContext'
import { UserContext } from '../context/UserProvider'
import { addFavorite, removeFavorite } from '../firebase'
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/StyledComponents";
import {Link} from 'react-router-dom'
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
    flex-direction:column;
    justify-content: flex-end;
    align-items: flex-end;

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
  const { favs,loaded } = useContext(SearchContext)
  const { user } = useContext(UserContext)
  const [fav, setFav] = useState(null);
  const [wallpaperData, setWallpaperData] = useState({
    loaded: false,
    data: null,
  });
  let { wallid } = useParams();

  const getImage = () => {
    axios
      .get(`https://wallhaven-api.herokuapp.com/search/wall/${wallid}`)
      .then((response) => {
        return setWallpaperData({ loaded: true, data: response.data.data });
      })
      .catch((err) => console.log(err));
  };

  const addFav = () => {
    console.log(wallpaperData)

    if(user){
      console.log('add to fav')
      addFavorite(user.uid, wallpaperData.data)
      setFav(true)
    }else{
      alert('tienes que loguearte')
    }
  }

  const removeFav = () => {
    console.log(user)
    if(user){
      console.log('remove fav')
      removeFavorite(user.uid, wallpaperData.data)
      setFav(false)
    }else{
      alert('tienes que loguearte')
    }
  }

  useEffect(() => {
    getImage();
    favs.filter(fav => fav.id === wallid ? fav : null).length === 1 ? setFav(true) : setFav(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded]);

  return (
    <Grid>
      {wallpaperData.loaded ? (
        <>
          {" "}
          <div className="wall-info">
            <Link to='/'> 
              <Button background='info'>
                <i className="fas fa-arrow-left mr-2"></i> Back to home
              </Button>
            </Link>
            <div>
              <div className="colors-boxes my-2" style={{ display: "flex" }}>
                <h3>Colors:</h3>
                <div>
                  {wallpaperData.data["colors"].map((color, key) => (
                    <div key={key}
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
            <div className='mb-2'>
              { fav ? <Button onClick={removeFav}>remove fav  <i className="fas fa-heart-broken ml-1"></i> </Button>:<Button  background="danger" onClick={addFav}>add to fav <i className="fas fa-heart ml-1"></i></Button>}
            </div>
            <div style={{height: "706px",
    width: "100%",
    border: '1px solid black',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    padding:'1rem 0rem',
    background: '#373232'}}>
              <img src={wallpaperData.data.path} alt="wallpapaer" />
            </div>
          </div>
          <div className="wall-download d-flex">
            {Object.keys(wallpaperData.data.thumbs).map((thumb, index) => (
              <a key={index} href={wallpaperData.data.thumbs[thumb]} download="">
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
