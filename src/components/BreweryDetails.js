import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import components
import BeerListItem from "./BeerListItem";
//import styled components
import { BackBtn } from "./styled/index";
import {
  InfoContainer,
  LinkContainer,
  Header,
  HeaderImage,
  HeaderTitle,
  Description,
  Founded,
} from "./styled/breweryDetailsStyled";

function BreweryDetails({ match }) {
  const [brewery, setBrewery] = useState({catalog: []});

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch("https://brugg-api.herokuapp.com/breweries");
        response = await response.json();
        console.log(match.params.breweryName, response, "asdfasdf");
        let foundBrewery = response.find(
          (brewery) => brewery.name === match.params.breweryName
        );
        console.log(foundBrewery);
        setBrewery(foundBrewery);
      } catch (err) {
        alert(err);
      }
    }
    fetchData();
  }, [match.params.breweryName]);
  //find item in array that has name = match.params.breweryName

  return (
    <div>
      <Link to="/breweries">
        <BackBtn />
      </Link>
      <Header>
        <HeaderImage src={brewery.logoSrc} />
        <HeaderTitle>{brewery.name}</HeaderTitle>
      </Header>
      <InfoContainer>
        <Founded>Founded in {brewery.established}</Founded>
        <Description>{brewery.about}</Description>

        <LinkContainer>
          <a href={brewery.webUrl}>
            <img src="https://svgshare.com/i/S0T.svg" alt="" />
          </a>
          <a href={brewery.facebookUrl}>
            <img src="https://svgshare.com/i/RzS.svg" alt="" />
          </a>
          <a href={brewery.instagramUrl}>
            <img src="https://svgshare.com/i/S18.svg" alt="" />
          </a>
          <a
            href={`https://www.google.com/maps/@${brewery.latitude},${brewery.longitude},15z`}
            rel="noreferrer"
            target="_blank"
          >
            <img src="https://svgshare.com/i/S05.svg" alt="" />
          </a>
        </LinkContainer>
      </InfoContainer>
      {/* Listing beers after brewery, without link */}
      <BeerListItem beers={brewery.catalog} showBreweryLink={false} />
    </div>
  );
}

export default BreweryDetails;
