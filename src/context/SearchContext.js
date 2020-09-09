import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const SearchContext = createContext(undefined);
const SearchDispatch = createContext(undefined);

function SearchProvider ({children})  {
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    // const [imagesLoaded, setImagesLoaded] = useState(false);
    const [imagesLoaded] = useState(false);
    const [topImages, setTopImages] = useState([]);
    const [topImagesLoaded, setTopImagesLoaded] = useState(false);
    const [mostviewed, setMostViewed] = useState([]);
    const [mostViewedLoaded, setMostViewedLoaded] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    // const [fav, setFav] = useState([{id:'mdjwjy'},{id:'g8opp3'},{id:'5w2gg8'},{id:'96jdd8'},{id:'lmlg6q'}])
    const [fav] = useState([{id:'mdjwjy'},{id:'g8opp3'},{id:'5w2gg8'},{id:'96jdd8'},{id:'lmlg6q'}])

    const handleFavs = (arr) => {
      let tempoArr = fav.forEach(f => {
        arr.forEach(item => item.id === f.id ? item.fav = true : null)
      })

      return tempoArr
    }

    const getMostViewed = (page = 1, query=' ') => {
      axios
      .get(`https://wallhaven-api.herokuapp.com/search/mostviewed?page=${page}&qs=${query}`)
      .then((response) => {
        console.log(response.data);
        handleFavs(response.data.data)
        setMostViewed([...mostviewed, response.data.data])
        setMostViewedLoaded(true)
      })
      .catch((err) => console.log(err));
    }

    const getTopImages = (page = 1, query=' ') => {
        axios
          .get(`https://wallhaven-api.herokuapp.com/search/top?page=${page}&qs=${query}`)
          .then((response) => {
            console.log(response.data);
            handleFavs(response.data.data)
            setTopImages([...topImages, response.data.data.slice(11,19)])
            setTopImagesLoaded(true)
          })
          .catch((err) => console.log(err));
    }

    // const generalImages = (page = 1, query=' ') => {
    //     console.log("corriencon con el parametro:" + query);
    //     axios
    //       .get(`https://wallhaven-api.herokuapp.com/search?page=${page}&qs=${query}`)
    //       .then((response) => {
    //         console.log(response);
    //         handleFavs(response.data.data)
    //         setImages([...images, response.data.data])
    //         setPage(page + 1)
    //         setImagesLoaded(true)
    //       })
    //       .catch((err) => console.log(err));
    //   };

    useEffect(()=>{
        getTopImages()
        getMostViewed()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
    <SearchDispatch.Provider value={{setPage, setImages, setTopImages, setSearchWord, setMostViewed}}>
        <SearchContext.Provider value={{page, fav, images, topImages, searchWord, mostviewed, imagesLoaded, topImagesLoaded, mostViewedLoaded}}>
            {children}
        </SearchContext.Provider>
    </SearchDispatch.Provider>
    )
}

export { SearchProvider, SearchDispatch, SearchContext };

