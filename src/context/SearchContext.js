import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const SearchContext = createContext(undefined);
const SearchDispatch = createContext(undefined);

function SearchProvider ({children})  {
    const [page, setPage] = useState(1);
    const [images, setImages] = useState([]);
    const [topImages, setTopImages] = useState([]);
    const [mostviewed, setMostViewed] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [fav, setFav] = useState([{id:'mdjwjy'},{id:'g8opp3'},{id:'5w2gg8'},{id:'96jdd8'},{id:'q67z9d'}])

    const handleFavs = (arr) => {
      let tempoArr = fav.forEach(f => {
        arr.forEach(item => item.id == f.id ? item.fav = true : null)
      })

      return tempoArr
    }

    const getMostViewed = () => {
      axios
      .get(`https://wallhaven-api.herokuapp.com/search/mostviewed?page=${page}&qs=${searchWord}`)
      .then((response) => {
        console.log(response.data);
        handleFavs(response.data.data)
        setMostViewed([...mostviewed, response.data.data])
      })
      .catch((err) => console.log(err));
    }

    const getTopImages = () => {
        axios
          .get(`https://wallhaven-api.herokuapp.com/search/top?page=${page}&qs=${searchWord}`)
          .then((response) => {
            console.log(response.data);
            handleFavs(response.data.data)
            setTopImages([...topImages, response.data.data.slice(11,19)])
          })
          .catch((err) => console.log(err));
    }

    const generalImages = () => {
        console.log("corriencon con el parametro:" + searchWord);
        axios
          .get(`https://wallhaven-api.herokuapp.com/search?page=${page}&qs=${searchWord}`)
          .then((response) => {
            console.log(response);
            handleFavs(response.data.data)
            setImages([...images, response.data.data])
            setPage(page + 1)
          })
          .catch((err) => console.log(err));
      };

    useEffect(()=>{
      if(images.length <= 0){
        generalImages()
      }
      if(topImages.length <= 0){
        getTopImages()
      }
      if(mostviewed.length <= 0){
        getMostViewed()
      }
    },[searchWord])

    return(
    <SearchDispatch.Provider value={{setPage, setImages, setTopImages, setSearchWord, setMostViewed}}>
        <SearchContext.Provider value={{page, fav, images, topImages, searchWord, mostviewed}}>
            {children}
        </SearchContext.Provider>
    </SearchDispatch.Provider>
    )
}

export { SearchProvider, SearchDispatch, SearchContext };

