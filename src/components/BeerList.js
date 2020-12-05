import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//import components
import Nav from "./Nav";
import BeerListItem, {filterOutDuplicateBeers} from "./BeerListItem";
import SortBeers from "./SortBeers";

//import styled components
import { BackBtn } from "./styled";
import { HeaderContainer, SearchBar } from "./styled/SearchBarStyled";
import { ListHeader, ListHeaderText, ListContainer } from "./styled/listStyled";

function BeerList() {
  const [beers, setBeers] = useState([]);
  const [filteredBeers, setFilteredBeers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch("https://brugg-api.herokuapp.com/breweries");
        const breweries = await response.json();
        
        // todo duplicate ætti að vera lagað í api
        const allBeers = filterOutDuplicateBeers(breweries.map(brewery => 
            brewery.catalog.map(beer => ({...beer, breweryName: brewery.name}))
          ).flat());

        setBeers(allBeers);
        setFilteredBeers(allBeers);
        console.log({allBeers});
      } catch (err) {
        alert(err);
      }
    }
    fetchData();
  }, []);

  //search bar
  function filterBeers(e) {
    const text = e.target.value;
    //filter through data from input value text. values and data uppercased so searchbar is not case sensitive.
    const searchValueData = beers.filter(
      (beer) =>
        beer.beerName && beer.beerName.toUpperCase().includes(text.toUpperCase())
    );
    setFilteredBeers(searchValueData);
  }

  //SORT FUNCTIONS
  function sortAZ() {
    const filteredBeersCopy = filteredBeers.slice(0);
    filteredBeersCopy.sort((a, b) => (a.beerName > b.beerName ? 1 : -1));
    setFilteredBeers(filteredBeersCopy);
  }

  function sortZA() {
    const filteredBeersCopy = filteredBeers.slice(0);
    filteredBeersCopy.sort((a, b) => (a.beerName > b.beerName ? -1 : 1));
    setFilteredBeers(filteredBeersCopy);
  }

  function sortType() {
    const filteredBeersCopy = filteredBeers.slice(0);
    filteredBeersCopy.sort((a, b) => (a.beerType > b.beerType ? 1 : -1));
    setFilteredBeers(filteredBeersCopy);
  }

  function sortABV() {
    const filteredBeersCopy = filteredBeers.slice(0);
    filteredBeersCopy.sort((a, b) =>
      parseFloat(a.beerABV) > parseFloat(b.beerABV) ? -1 : 1
    );
    setFilteredBeers(filteredBeersCopy);
    console.log(parseFloat(filteredBeersCopy[0].beerABV));
  }

  //split array with split method with % as parameter, parseInt the array to sort by ABV%

  return (
    <div>
      <HeaderContainer>
        <Link to="/">
          <BackBtn></BackBtn>
        </Link>
        <SearchBar
          className="input"
          type="text"
          placeholder="Search for beers.."
          onChange={filterBeers}
          // onKeyPress={handleEnterKeyPressed}
        />
      </HeaderContainer>
      <SortBeers
        sortAZ={sortAZ}
        sortZA={sortZA}
        sortType={sortType}
        sortABV={sortABV}
      />
      <ListHeader>
        <ListHeaderText>Beers</ListHeaderText>
      </ListHeader>
      <ListContainer>
        <BeerListItem beers={filteredBeers} />
      </ListContainer>
      <Nav />
    </div>
  );
}

export default BeerList;
