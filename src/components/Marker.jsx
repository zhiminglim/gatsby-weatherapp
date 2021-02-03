import React, { useEffect, useState } from "react";
import { greatPlaceStyle, greatPlaceStyleHover } from "../pages/hover-styles";

function Marker(props) {

  const [customStyle, setCustomStyle] = useState();

  useEffect(() => {
    props.$hover ? setCustomStyle(greatPlaceStyleHover) : setCustomStyle(greatPlaceStyle);
  }, [props.$hover]);

  // style={{
  //   color: "white",
  //   background: "grey",
  //   padding: "15px 10px",
  //   display: "inline-flex",
  //   textAlign: "center",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: "100%",
  //   transform: "translate(-50%, -50%)",
  // }}

  return (
    <div style={customStyle}>
        {props.markerTitle}
    </div>
  )
}

export default Marker
