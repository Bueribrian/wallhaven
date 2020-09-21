import React, { useEffect, useReducer, useCallback } from "react";
import { useParams } from "react-router-dom";
import Wallpapers from "../components/Wallpapers";
import axios from "axios";

const startFetch = "START_FETCH";
const fetchSuccess = "FETCH_SUCCESS";
const errorFetch = "FETCH_ERROR";
const reachedEnd = "REACHED_END";

const idleStatus = "IDLE";
const errorStatus = "ERROR";
const loadingStatus = "LOADING";
const finishedStatus = "FINISHED";

const infiniteScrollReducer = (state, action) => {
  console.log("state ", state);
  switch (state.status) {
    case idleStatus:
    case errorStatus:
      return action.type === startFetch
        ? { ...state, status: loadingStatus }
        : state;

    case loadingStatus:
      if (action.type === errorFetch) {
        return { ...state, status: errorStatus };
      }
      if (action.type === reachedEnd) {
        return { ...state, status: finishedStatus };
      }
      if (action.type === fetchSuccess) {
        return {
          ...state,
          imgs: [...state.imgs, [...action.payload.imgs]],
          pageNumber: state.pageNumber + 1,
          status: idleStatus,
        };
      }
      return state;
    case finishedStatus:
      return state;
    default:
      throw new Error("Unknow state");
  }
};

const initialState = { imgs: [], status: idleStatus, pageNumber: 1 };

export default function Search() {
  let { topic, searchWord } = useParams();
  const [state, dispatch] = useReducer(infiniteScrollReducer, initialState);

  const observeBorder = useCallback((node) => {
    if (node !== null) {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.intersectionRatio === 1) {
              dispatch({ type: startFetch });
            }
          });
        },
        { threshold: 1, rootMargin: "250px" }
      ).observe(node);
    }
  }, []);

  topic = topic === "general" ? "" : topic;

  const getImages = async (state, dispatch) => {
    try {
      const res = await axios.get(
        `https://wallhaven-api.herokuapp.com/search/${topic}?page=${
          state.pageNumber
        }&qs=${searchWord || ""}`
      );
      console.log(res.status);
      if (res.status === 200) {
        console.log("entre");
        const imgs = await res.data.data;
        if (imgs.length === 0) {
          return dispatch({ type: reachedEnd });
        }
        return dispatch({ type: fetchSuccess, payload: { imgs } });
      } else {
        dispatch({ type: errorFetch });
      }
    } catch (e) {
      // dispatch({type: errorFetch})
    }
  };

  useEffect(() => {
    if (state.status === loadingStatus) {
      getImages(state, dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state, topic, searchWord]);

  return (
    <div id="wallpapers-container">
      {/* Buscando por {searchWord} {topic ? `topic: ${topic}` : ""}
      {loaded ? (
        <Wallpapers size="23" images={images} loaded={loaded} />
      ) : (
        "cargando..."
      )}
      <button onClick={() => setPage(page + 1)}>Load page {page}</button> */}
      {renderImages()}
      {state.status === errorStatus && renderErrorRetryButton()}
      {state.status === loadingStatus && renderLoadingMessage()}
      {state.status === finishedStatus && renderNoMoreImagesMessage()}
      {renderBottomBorder()}
    </div>
  );

  function renderBottomBorder() {
    return <div ref={observeBorder}></div>;
  }

  function renderNoMoreImagesMessage() {
    let styles = {
      width: "100%",
      textAlign: "center",
      fontSize: "2.5rem",
      fontWeight: "bold",
      padding: "3rem 0rem",
      margin: "2rem 0rem",
    };

    return <p style={styles}>There aren't more images</p>;
  }

  function renderImages() {
    console.log("HAAAAAAAAAAAA", state.imgs);
    return <Wallpapers loaded={true} size="23" images={state.imgs} />;
  }

  function renderErrorRetryButton() {
    return (
      <button type="button" onClick={() => dispatch({ type: startFetch })}>
        Error ! click to try again
      </button>
    );
  }
  function renderLoadingMessage() {
    let styles = { fontSize: "2.5rem", textAlign: "center", padding:'2rem 0rem'}
    return <p style={styles}>Loading...</p>;
  }
}
