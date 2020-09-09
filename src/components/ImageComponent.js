import React, { useState, useEffect } from "react";
import WallLoader from "../components/WallLoader";
import { Link } from 'react-router-dom'
import { Badge } from '../components/StyledComponents'
import styled from "styled-components";

const CardWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index:2;
    transition: .3s all;
    overflow: hidden;
    // border: ${props => props.fav ? '2px solid crimson' : '2px solid transparent'};
    &:hover .card-back{
        opacity:1;
        transition: .3s all;
    }
    &:hover img{
      transform: scale(1.1);
      transition: .3s all;
    }
`;
const CardFront = styled.div`
        width: 100%;
        height: 100%;
        min-height: 220px;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: .3s all;

    }
    
`;
const CardBack = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,.5) 0%, rgba(53,53,53,0) 70%, rgba(21,21,21,0) 82%, rgba(0,0,0,.6) 100%);
    opacity:0;
    transition: .3s all;
    z-index: 3;

    & .fav {
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index:25;
    }
    & .category {
      margin: 10px;
      text-transform: capitalize;
    }
    & .resolution{
      position: absolute;
      bottom: 10px;
      right: 50%;
      transform: translateX(50%);
      & h3{
        color: #fff;
      }
      & p{
        color: #A8A3A3;
        font-size: .8rem;
      }
    }

    & .views{
      position: absolute;
      top: 10px;
      right: 10px;
      font-size:1rem;
      color: #fff;
      font-weight: 800;
      line-height:1;
      display: flex;
      align-items: center;
      & i {
        margin: 0 .3rem;
      }
    }

`;

function Card({ src, views, resolution, id, category, fav }) {
  return (
    <CardWrapper fav={fav}>
      <Link to={`/wall/${id}`}>
      <CardFront className='card-front'>
        <img loading="lazy" src={src} alt="wallpaper" />
      </CardFront>
      <CardBack className='card-back'>
        <div className='resolution'><Badge background='#000'><h3>Resolution:</h3><p>{resolution}</p></Badge></div>
        <div className='views'><i className="fas fa-eye"></i> {views}</div>
        <div className='category'><Badge category={category}>{category}</Badge></div>
        <div className='fav'>{fav ? <Badge background='crimson'><i className="fas fa-heart"></i></Badge> : <Badge background='gray'><i className="far fa-heart"></i></Badge>}</div>
      </CardBack>
      </Link>
    </CardWrapper>
  );
}

export default function ImageComponent(props) {
  const { resolution, views, category, id, fav } = props.stats
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // console.log(props);
    setLoaded(true);
  }, []);

  return (
    <>{ loaded ? <Card fav={fav} src={props.image} id={id} category={category} resolution={resolution} views={views} /> : <WallLoader />}</>
  );
}
