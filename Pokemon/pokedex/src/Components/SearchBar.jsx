import React, { useState } from "react";
import Card from "./Card"; // Assuming you have a Card component
import "./style.css";

const SearchBar = ({ pokemonData, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const Main = () => {
  const [pokeData, setPokeData] = useState([]); // Your Pokémon data state

  const handleSearch = (query) => {
    // Perform search based on the query and update the state
    const searchResults = pokeData.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query.toLowerCase())
    );
    setPokeData(searchResults);
  };

  // Your existing code...

  return (
    <>
      <SearchBar pokemonData={pokeData} onSearch={handleSearch} />
      {/* Rest of your components... */}
      <Card pokemon={pokeData} loading={loading} infoPokemon={(poke) => console.log(poke)} />
    </>
  );
};

export default Main;
