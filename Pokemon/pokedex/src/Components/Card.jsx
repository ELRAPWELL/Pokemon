import React, { useState } from "react";

const Card = ({ pokemon, loading, infoPokemon }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map((item) => (
          <div className="card" key={item.id} onClick={() => infoPokemon(item)}>
            <h2>{item.id}</h2>
            {imageLoaded ? (
              <img src={item.sprites.front_default} alt="" />
            ) : (
              <div style={{ width: "96px", height: "96px", background: "#eee" }}>
                {/* Placeholder while image is loading */}
              </div>
            )}
            <h2>{item.name}</h2>
            <img
              src={item.sprites.front_default}
              alt=""
              style={{ display: "none" }}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        ))
      )}
    </>
  );
};

export default Card;
