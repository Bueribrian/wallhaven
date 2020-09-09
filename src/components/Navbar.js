import React, { useState, useContext } from "react";
import styled from "styled-components";
import { SearchContext, SearchDispatch } from "../context/SearchContext";
import { ThemeDispatchContext, ThemeContext } from "../context/ThemeProvider";
import { Badge } from "../components/StyledComponents";
import { Link, Redirect } from "react-router-dom";



const NavbarTop = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0px 15px;
`

const InputSearch = styled.input`
 max-width: 520px;
 min-width: 300px;
 padding: 0px 15px;
 height: 40px;
 background: rgba(0,0,0,0.2);
 border:none;
 font-family: 'Raleway', sans-serif;
 
`


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
  const { searchWord, setSearchWord } = useContext(SearchDispatch);
  const { setTheme, setNavOpen } = useContext(ThemeDispatchContext);
  const { theme, navOpen } = useContext(ThemeContext);
  const { setPage } = useContext(SearchContext);
  const { setWallpapers } = useContext(SearchContext);

  const [searchParam, setSearchParam] = useState('')

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

  const handleForm = (e) => {
    console.log('Preveni el default?')
    window.location.href=`/search/top/${searchParam}`
    e.preventDefault()
  }

  const handleInput = (e) => {
    setSearchParam(e.target.value)
    e.preventDefault();
  }


  return (
    <div>
      <NavbarTop>
        
        <div>
          <div>
            <i onClick={()=>{setNavOpen(!navOpen)}} className="fas fa-bars"></i>
          </div>
          <Link to="/">Wallparadise</Link>
        </div>
        <form onSubmit={handleForm}>
          <InputSearch onChange={handleInput} placeholder='Search something...' />
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
