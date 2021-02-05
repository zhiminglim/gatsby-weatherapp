import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "../styles/global.css"


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi there!</h1>
    <p>Welcome to my website. This is still under development.</p>
    <p>I created this project to observe the weather around different weather stations in Singapore.</p>
    <p>Data is pulled with courtesy of data.gov.sg APIs.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-mapdemo/">Go to map demo</Link> <br />
  </Layout>
)

export default IndexPage
