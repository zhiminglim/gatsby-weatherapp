import React, { useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GoogleMapReact from "google-map-react"

function SecondPage() {

  const [mapCenter, setMapCenter] = useState({
    lat: 1.3521,
    lng: 103.8198
  })
  const [zoom, setZoom] = useState(11);



  return (
    <Layout>
      <SEO title="Page two" />
      <div style={{ width: "100%", height: "600px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.GOOGLE_MAP_API }}
          defaultCenter={mapCenter}
          defaultZoom={zoom}
        >

        </GoogleMapReact>
      </div>

      <Link to="/">Go back to the homepage</Link>
    </Layout>
  );
}

export default SecondPage
