import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import stationsData from "../constants/stations";
import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";

function MapPage() {

  const mapStyles = {
    height: "650px",
    width: "100%"
  };

  const defaultCenter = {lat: 1.3521, lng: 103.8198};
  const zoom = 11;
  const [stations, setStations] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState({});

  const onSelect = item => {
    setSelectedMarker(item);
  }

  useEffect(() => {
    fetch("https://api.data.gov.sg/v1/environment/wind-speed")
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        // console.log(data.items[0].readings);
        // console.log(data.metadata.stations);

        const readings = data.items[0].readings;

        for (var reading of readings) {
          for (var s of stationsData) {
            if (s.id === reading.station_id) {
              s.windSpeed = reading.value;
            }
          }
        }

        // setStations(stationsData);

        fetch("https://api.data.gov.sg/v1/environment/wind-direction")
          .then(response => response.json())
          .then(data => {
            let windDirectionReadings = data.items[0].readings;

            for (var reading of windDirectionReadings) {
              for (var s of stationsData) {
                if (s.id === reading.station_id) {
                  s.windDirection = reading.value;
                }
              }
            }

            //console.log(stationsData);
            setStations(stationsData);
          });
      });
  }, []);


  const onLoad = marker => {
    //console.log('marker: ', marker)
  }

  return (
    <Layout>
      <SEO title="Page three" />

      <LoadScript
        googleMapsApiKey={process.env.GATSBY_GOOGLE_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={zoom}
          center={defaultCenter}
        >
          {stations.map(item => {
            return (
              <Marker 
                key={item.id}
                onLoad={onLoad}
                position={item.location}
                onClick={ () => onSelect(item) }
              />
            );
          })}

          { 
            selectedMarker.location && 
            (
              <InfoWindow
                position={selectedMarker.location}
                clickable={true}
                onCloseClick={ () => setSelectedMarker({}) }
              >
                <div>
                  <p>{selectedMarker.name}</p>
                  <p>Wind Speed : {selectedMarker.windSpeed} knots</p>
                  <p>Wind Direction : {selectedMarker.windDirection} degrees</p>
                </div>
              </InfoWindow>
            )
          }
        </GoogleMap>
      </LoadScript>

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
}

export default MapPage
