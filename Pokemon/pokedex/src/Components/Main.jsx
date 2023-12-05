import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import SearchBar from "./SearchBar"; // Assuming you have a SearchBar component
import Pokeinfo from "./Pokeinfo";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex,setPokeDex]=useState();

  const pokeFun = async (fetchUrl) => {
    try {
      setLoading(true);
      const res = await axios.get(fetchUrl);

      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      getPokemon(res.data.results);

      const newPokemonData = await Promise.all(
        res.data.results.map(async (item) => {
          const result = await axios.get(item.url);
          return result.data;
        })
      );

      setPokeData((prevData) => [...prevData, ...newPokemonData]);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    pokeFun(url);
  }, [url]);

  const handleSearch = (query) => {
    // Perform search based on the query and update the state
    const searchResults = pokeData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setPokeData(searchResults);
  };

  return (
    <>
      <SearchBar pokemonData={pokeData} onSearch={handleSearch} />
      <div className="container">
        <div className="left-content">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <Card
              pokemon={pokeData}
              loading={loading}
              infoPokemon={(poke) => console.log(poke)}
            />
          )}

          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  pokeFun(prevUrl);
                }}
              >
                Previous
              </button>
            )}

            {nextUrl && (
              <button
                onClick={() => {
                  pokeFun(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">{Pokeinfo}</div>
      </div>
    </>
  );
};

export default Main;
