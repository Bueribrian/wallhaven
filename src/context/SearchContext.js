import React, { createContext, useState, useEffect, useContext } from 'react'
import {UserContext} from './UserProvider';

// import { generateFavsDocument } from '../firebase'
import axios from 'axios'

const SearchContext = createContext(undefined);
const SearchDispatch = createContext(undefined);

function SearchProvider ({children})  {
    const  {loaded, favs} = useContext(UserContext)
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [topImages, setTopImages] = useState([]);
    const [topImagesLoaded, setTopImagesLoaded] = useState(false);
    const [mostviewed, setMostViewed] = useState([]);
    const [mostViewedLoaded, setMostViewedLoaded] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    

    // const handleFavs = (arr) => {
    //   let tempoArr = favs.forEach(f => {
    //     arr.forEach(item => item.id === f.id ? item.fav = true : item.fav = false)
    //   })

    //   return tempoArr
    // }

    const getMostViewed = (page = 1, query=' ') => {
      axios
      .get(`https://wallhaven-api.herokuapp.com/search/mostviewed?page=${page}&qs=${query}`)
      .then((response) => {
        // handleFavs(response.data.data)
        setMostViewed([...mostviewed, response.data.data])
        setMostViewedLoaded(true)
      })
      .catch((err) => console.log(err));
    }

    const getTopImages = (page = 1, query=' ') => {
        axios
          .get(`https://wallhaven-api.herokuapp.com/search/top?page=${page}&qs=${query}`)
          .then((response) => {
            // handleFavs(response.data.data)
            setTopImages([...topImages, response.data.data.slice(11,19)])
            setTopImagesLoaded(true)
          })
          .catch((err) => console.log(err));
    }

    const getGeneralImages = (page = 1, query=' ') => {
        axios
          .get(`https://wallhaven-api.herokuapp.com/search?page=${page}&qs=${query}`)
          .then((response) => {
            // handleFavs(response.data.data)
            setImages([...images, response.data.data])
            setImagesLoaded(true)
          })
          .catch((err) => console.log(err));
      };

    const firstLoadHome = async () => {
         await getTopImages()
         await getMostViewed()
         await getGeneralImages()
    }

    useEffect(()=>{
      if(loaded){
        firstLoadHome()
       
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loaded])

    
    return(
    <SearchDispatch.Provider value={{setPage, setImages, setTopImages, setSearchWord, setMostViewed}}>
        <SearchContext.Provider value={{loaded, page, favs, images, topImages, searchWord, mostviewed, imagesLoaded, topImagesLoaded, mostViewedLoaded}}>
            {children}
        </SearchContext.Provider>
    </SearchDispatch.Provider>
    )
}

export { SearchProvider, SearchDispatch, SearchContext };

