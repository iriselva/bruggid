import React, { useEffect, useState } from "react";
import * as geolib from 'geolib';
import { ListContainer, ListCard, ListCardInfo, ListCardTitle } from "./styled/listViewStyled";
import { Link } from "react-router-dom";

function BreweriesNearYou({breweries, position}) {
    const [nearestBreweries, setNearestBreweries] = useState()
    
    useEffect(() => {
        console.log(breweries)
        if (!position || breweries.length === 0) return
        const nearest = breweries.map((brewery) => {
            const breweryCoord = ({latitude: brewery.latitude, longitude: brewery.longitude}) 
            return {name: brewery.name, breweryCoord, dist: geolib.getDistance(position, breweryCoord)}
        })
        .sort( (a, b) => a.dist - b.dist )
        const copyOfNearest = nearest.slice(0, 5)

        setNearestBreweries(copyOfNearest)

    }, [position, breweries])
   

    function getKm(originalDistance) {
       const distance = geolib.convertDistance(originalDistance, 'km')
       return Math.round(distance * 10) / 10
    }

    return (
        <ListContainer>
            {(position && nearestBreweries && nearestBreweries.length > 0) 
              ? nearestBreweries.map((brewery) => (
                <Link key={brewery.name} to ={`/breweries/${brewery.name}`}>
                    <ListCard>
                        <ListCardInfo>
                            <ListCardTitle>{brewery.name}</ListCardTitle>
                        </ListCardInfo>
                        <p>{getKm(brewery.dist)} km</p>
                    </ListCard>
                </Link>

            ))

            : <p>Waiting for your location</p>
            }
        </ListContainer>
    )
}

export default BreweriesNearYou;