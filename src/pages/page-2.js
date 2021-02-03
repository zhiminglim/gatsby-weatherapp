import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Marker from "../components/Marker"
import GoogleMapReact from "google-map-react"

import { K_SIZE } from "./hover-styles";

function SecondPage() {

  const mapCenter = {lat: 1.3521, lng: 103.8198};
  const zoom = 11;
  const [stations, setStations] = useState([]);

  function MyWeather(id, name, location) {
    this.id = id;
    this.name = name;
    this.location = location;
  }

  useEffect(() => {
    fetch("https://api.data.gov.sg/v1/environment/wind-speed")
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      // console.log(data.items[0].readings);
      // console.log(data.metadata.stations);

      const readings = data.items[0].readings;
      const stationsData = data.metadata.stations;
      const stationsMap = new Map();

      for (var metadata of stationsData) {
        stationsMap.set(metadata.id, new MyWeather(metadata.id, metadata.name, metadata.location));
      }

      for (var reading of readings) {
        var myWeatherData = stationsMap.get(reading.station_id);
        myWeatherData.windSpeed = reading.value;
        stationsMap.set(reading.station_id, myWeatherData);
      }

      // Convert data structure to array for rendering
      const tempArr = [];
      for (let value of stationsMap.values()) {
        tempArr.push(value);
      }
      setStations(tempArr);
    });
  }, [stations]);

  return (
    <Layout>
      <SEO title="Page two" />
      <div style={{ width: "100%", height: "600px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_API_KEY }}
          defaultCenter={mapCenter}
          defaultZoom={zoom}
          hoverDistance={K_SIZE / 2}
        >

          {stations.map((element, index) => {
            return (
              <Marker 
                key={element.id}
                lat={element.location.latitude}
                lng={element.location.longitude}
                markerTitle={element.name}
                markerWindSpeed={element.windSpeed}
              />
            );
          })}
        </GoogleMapReact>
      </div>

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
}

export default SecondPage
