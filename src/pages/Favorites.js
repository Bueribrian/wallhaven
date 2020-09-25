import React, {useContext} from 'react'
import { SearchContext } from '../context/SearchContext';
import { UserContext } from '../context//UserProvider'
import ImageComponent from '../components/ImageComponent';
import { GridImagesWrapper } from "../components/StyledComponents";
import {Link} from 'react-router-dom'

export default function Favorites() {
  const { favs } = useContext(SearchContext)
  const { user } = useContext(UserContext)



  let card = {

  }

    return (
        <div className='container my-2'>
            <h1>Favoritos</h1>
            {!user ? "Tenes que loguearte para ver tus favoritos" : favs.length === 0 ? <h2>No tienes wallpapers en favoritos, prueba buscando uno que te guste entre los mas vistos <br/> <Link to='/search/mostViewed'>Ir</Link></h2> : <GridImagesWrapper>{ favs.map(fav => <ImageComponent style={card} image={fav.thumbs.large} stats={{resolution:fav.resolution,views: fav.views, category:fav.category, id:fav.id}} fav={true}/>)}</GridImagesWrapper>}
        </div>
        
    )
}
