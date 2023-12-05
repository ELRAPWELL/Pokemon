import React from "react";

const Pokeinfo = ({ data }) => {
  return (
    <>
      {data ? (
        <>
          <h1>{data.name}</h1>
          <img src={data.sprites.front_default} alt="" />
          <div className="abilities">
            {data.abilities.map((poke, index) => (
              <div className="group" key={index}>
                <h2>{poke.ability.name}</h2>
              </div>
            ))}
          </div>
          <div className="base-stat">
            {data.stats.map((poke, index) => (
              <h3 key={index}>
                {poke.stat.name}: {poke.base_stat}
              </h3>
            ))}
          </div>
        </>
      ) : (
        <p>No Pokemon data available</p>
      )}
    </>
  );
};

export default Pokeinfo;
