import React, { useState } from "react";
import axios from 'axios'; 
import FavouritesToPlan from './FavouritesToPlan'; 

import "../favouritesSearch.css"
 

export default function Favourites (props) { 
  const [details, setDetails] = useState(false)
  const onClickDelete = () => {
    const favouriteData = {
      'id':props.favourite_id
    }
    axios.post("/api/favourites", favouriteData)
    .then(function(response){
      props.setFavourites( (prev) => {
        let index;

        prev.forEach( (favourite, i) => {
          if (favourite.favourite_id === props.favourite_id) {
            index = i
          }
        })
        const prevCopy = [...prev]

        prevCopy.splice(index, 1)
        return prevCopy
      })
    });
  }

  const showDetails = () => {
    // e.preventDefault();
    return (
        <FavouritesToPlan {...props} toggleDisplay={() => setDetails(false)}/>

    )
  }
  return (
    <article>
      { details ? showDetails() :
      <div class="favorites-card">
        <div class="favorites-card-name">
          <p>{props.name}</p>
        </div>
        <div class="favorites-card-address">
          <p>{props.address}</p>
        </div>
        <div class="favorites-card-types">
          <p>Category: {props.types}</p>
        </div>
        <div class="favorites-button-bundle">
          <button onClick={() => setDetails(true)} class="favorites-card-buttons"> Add to Plan </button>
          <button onClick={onClickDelete} class="favorites-card-buttons"> Remove from Favourites </button>
        </div>
      </div>}
    </article>
  )
}