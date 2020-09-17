import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wallpapers from "../components/Wallpapers";
import axios from "axios";

export default function Search() {
  let { topic, searchWord } = useParams();
  let [loaded, setLoaded] = useState(false);
  let [images, setImages] = useState([]);
  let [page, setPage] = useState(1);

//   const startFetch = "START_FETCH";
//   const fetchSuccess = "FETCH_SUCCESS";
//   const errorFetch = "FETCH_ERROR";
//   const reachedEnd = "REACHED_END";

//   const idleStatus = "IDLE";
//   const errorStatus = "ERROR";
//   const loadingStatus = "LOADING";
//   const finishedStatus = "FINISHED";

  topic = topic === "general" ? "" : topic;

  const getImages = (topic, page = 1, searchWord = " ") => {
    axios
      .get(
        `https://wallhaven-api.herokuapp.com/search/${topic}?page=${page}&qs=${searchWord}`
      )
      .then((response) => {
        setImages([...images, response.data.data]);
        setLoaded(true);
        console.log(response.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getImages(topic, page, searchWord);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, topic, searchWord]);

  return (
    <div>
      Buscando por {searchWord} {topic ? `topic: ${topic}` : ""}
      {loaded ? (
        <Wallpapers size="23" images={images} loaded={loaded} />
      ) : (
        "cargando..."
      )}
      <button onClick={() => setPage(page + 1)}>Load page {page}</button>
    </div>
  );
}
