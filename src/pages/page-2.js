import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Marker from "../components/Marker"
import GoogleMapReact from "google-map-react"

function SecondPage() {

  const [mapCenter, setMapCenter] = useState({
    lat: 1.3521,
    lng: 103.8198
  })
  const zoom = 12;


  return (
    <Layout>
      <SEO title="Page two" />
      <div style={{ width: "100%", height: "600px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GATSBY_GOOGLE_API_KEY }}
          defaultCenter={mapCenter}
          defaultZoom={zoom}
        >

          <Marker 
            lat={1.4172}
            lng={103.74855}
            markerTitle="Woodlands Road"
          />
        </GoogleMapReact>
      </div>

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
}

export default SecondPage
