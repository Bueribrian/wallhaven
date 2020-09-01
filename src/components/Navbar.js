import React, { useState, useContext } from "react";
import styled from "styled-components";
import { SearchContext } from "../context/SearchContext";
import { ThemeDispatchContext, ThemeContext } from "../context/ThemeProvider";
import { Badge } from "../components/StyledComponents";
import { Link } from "react-router-dom";

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
  const [searchParameter, setSearchParameter] = useState("");
  const { search, setSearch } = useContext(SearchContext);
  const { setTheme } = useContext(ThemeDispatchContext);
  const { theme } = useContext(ThemeContext);
  const { setPage } = useContext(SearchContext);
  const { setWallpapers } = useContext(SearchContext);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const searchWallpapers = () => {
    setWallpapers([]);
    setSearch(searchParameter);
    setPage(1);
  };

  return (
    <div>
      <div>
        <div>
          <Link to="/">Home</Link>
        </div>
        <ThemePicker
          onClick={changeTheme}
          className={theme === "light" ? "active" : ""}
        >
          <i className="fas fa-sun"></i>
          <i className="fas fa-moon"></i>
        </ThemePicker>
      </div>
      <NavSections>
        <Badge background="#6B2AB5">
          <Link to="/top">Top</Link>
        </Badge>
        <Badge background="#39F66C">
          <Link to="/top">Most viewed</Link>
        </Badge>
        <Badge background="#F639F6">
          <Link to="/top">Anime</Link>
        </Badge>
        <Badge background="#FFB07B">
          <Link to="/top">General</Link>
        </Badge>
      </NavSections>
    </div>
  );
}
