import React, { useState, useContext } from "react";
import styled from "styled-components";
// import { SearchContext, SearchDispatch } from "../context/SearchContext";
import { ThemeDispatchContext, ThemeContext } from "../context/ThemeProvider";
import { Badge } from "../components/StyledComponents";
import { Link, useHistory } from "react-router-dom";

const NavbarTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0px 15px;
`;

const ThemePicker = styled.div`
  position: relative;
  height: 40px;
  width: 40px;
  border: 4px solid #ffffff;
  overflow: hidden;
  transition: 0.3s all;
  border-radius: 50%;
  box-shadow: inset 3px 3px 3px rgba(0, 0, 0, 0.1);

  & i {
    font-size: 1.2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transition: 0.3s all;
  }
  & .fa-sun {
    transform: translate(-220%, -51%);
  }
  & .fa-moon {
    transform: translate(-50%, -51%);
  }
  &.active {
    & .fa-sun {
      transform: translate(-50%, -51%);
    }
    & .fa-moon {
      transform: translate(220%, -51%);
    }
  }
`;

const NavSections = styled.div`
  width: 100%;
  height; 60px;
  background: #474747;
  padding: .4rem;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div{
    margin: 0rem .8rem;
    cursor:pointer;
  }
`;

export default function Navbar() {
  const history = useHistory();
  // const { searchWord, setSearchWord } = useContext(SearchDispatch);
  const { setTheme, setNavOpen } = useContext(ThemeDispatchContext);
  const { theme, navOpen } = useContext(ThemeContext);
  // const { setPage } = useContext(SearchContext);
  // const { setWallpapers } = useContext(SearchContext);

  const [searchParam, setSearchParam] = useState("");
  const [recordSearch, setRecordSearch] = useState([]);
  const [recordSearchFocus, setRecordSearchFocus] = useState(false);
  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  // const searchWallpapers = (searchParameter) => {
  //   setWallpapers([]);
  //   setSearchWord(searchParameter);
  //   setPage(1);
  // };

  const saveRecordSearch = (param) => {
    let record = localStorage.getItem("RecordSearch");
    if (param.length <= 0 || param === "") {
      return;
    }
    if (record) {
      let listRecords = JSON.parse(record);
      if(listRecords.indexOf(param) === -1) listRecords.unshift(param)
      localStorage.setItem("RecordSearch", JSON.stringify(listRecords));
    } else {
      localStorage.setItem("RecordSearch", JSON.stringify([param]));
    }
  };

  const getRecordSearch = () => {
    let record = JSON.parse(localStorage.getItem("RecordSearch"));
    setRecordSearch(record || []);
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    // window.location.href = `/search/top/${searchParam}`;
    saveRecordSearch(searchParam);
    getRecordSearch();
    history.push(`/search/general/${searchParam}`);
  };

  const deteleRecordItem = (param) => {
    let record = JSON.parse(localStorage.getItem("RecordSearch"));
    let filteredRecords = record.filter((r) => r !== param);
    localStorage.setItem("RecordSearch", JSON.stringify(filteredRecords));
    getRecordSearch();
  };

  const handleAutoComplete = (record) => {
    history.push(`/search/general/${record}`);
  };

  // const SearcherComponent = () => {
  //   return (

  //   );
  // };

  return (
    <div>
      <NavbarTop>
        <div style={{ display: "flex" }}>
          <div>
            <i
              style={{
                width: "30px",
                height: "100%",
                cursor: "pointer",
                lineHeight: "50%",
                fontSize: "1.2rem",
                marginRight: "3rem",
              }}
              onClick={() => {
                setNavOpen(!navOpen);
              }}
              className="fas fa-bars"
            ></i>
          </div>
          <Link
            to="/"
            style={{
              fontSize: "1.2rem",
              color: "#000",
              textDecoration: "none",
            }}
          >
            Wallparadise
          </Link>
        </div>
        <form
          onFocus={(e) => {
            setRecordSearchFocus(true);
            getRecordSearch();
          }}
          className="searcher"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={searchParam}
            onChange={(e) => {
              setSearchParam(e.target.value);
            }}
            placeholder="Search something..."
          />

          {recordSearchFocus ? (
            <ul
              className="searchHistory"
              onMouseLeave={() => setRecordSearchFocus(false)}
            >
              {recordSearch.length > 0 ? (
                <>
                  <small>Busquedas recientes:</small>
                  {recordSearch.map((record) => (
                    <li key={record} className="searchRecordItem">
                      <span
                        onClick={(e) => {
                          handleAutoComplete(e.target.textContent);
                          setSearchParam(e.target.textContent)
                        }}
                      >
                        {record}
                      </span>{" "}
                      <i
                        className="fas fa-times"
                        onClick={() => {
                          deteleRecordItem(record);
                        }}
                      ></i>
                    </li>
                  ))}
                </>
              ) : (
                "No hay busquedas recientes"
              )}
            </ul>
          ) : (
            ""
          )}
        </form>

        <ThemePicker
          onClick={changeTheme}
          className={theme === "light" ? "active" : ""}
        >
          <i className="fas fa-sun"></i>
          <i className="fas fa-moon"></i>
        </ThemePicker>
      </NavbarTop>

      <NavSections>
        <Badge background="#6B2AB5">
          <Link to="/search/top">Top</Link>
        </Badge>
        <Badge background="#39F66C">
          <Link to="/search/mostViewed">Most viewed</Link>
        </Badge>
        <Badge background="#F639F6">
          <Link to="/search/top/anime">Anime</Link>
        </Badge>
        <Badge background="#FFB07B">
          <Link to="/search/general">General</Link>
        </Badge>
      </NavSections>
    </div>
  );
}
