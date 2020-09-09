import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'




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
    },[])

  return <div style={{width: '95%', height: '95%', margin:'0 auto'}}>
      <img style={{width: '100%', height: '100%'}} src={wallpaper} alt='wallpapaer'/>
  </div>
}
