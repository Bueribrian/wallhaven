import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import styled from "styled-components";
import { Button } from '../components/StyledComponents'
import axios from 'axios'

let Grid = styled.div`
  padding: 2rem 5rem 5rem 5rem;
  display: grid;
  grid-template-columns: 1fr 3fr;
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

`


export default function Wall() {
    const [ wallpaper, setWallpaper ] = useState('')
    let { wallid } = useParams();

    const getImage = () => {
        axios
          .get(
            `https://wallhaven-api.herokuapp.com/search/wall/${wallid}`
          )
          .then((response) => {
            console.log(response.data.data.thumbs.original);
            return setWallpaper(response.data.data.path)
          })
          .catch((err) => console.log(err));
      };
    
    
    useEffect(()=>{
      getImage()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

  return <Grid>
            <div className='wall-info'>
              lorem ipsum dolor sit amet, consectet<br></br>
              lorem ipsum dolor sit amet, consectet<br></br>
              lorem ipsum dolor sit amet, consectet<br></br>
            </div>
            <div className='wall-image'>
                <img src={wallpaper} alt='wallpapaer'/>
            </div>
            <div className='wall-download d-flex'>
              <Button>Download first resolution</Button>
              <Button>Download second resolution</Button>
              <Button>Download third resolution</Button>
            </div>
          </Grid>
}
