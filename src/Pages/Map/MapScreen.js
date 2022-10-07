import React from "react";
import mapOne from "../../Assets/mapOne.jpeg";
import mapTwo from "../../Assets/mapTwo.jpeg";
import mapThree from "../../Assets/mapThree.jpeg";

import "./MapScreen.css";

 
import Navbar from "../../Components/Navbar/Navbar";
 

function MapScreen() {
   

  return (
    <div>
      <Navbar activePage={"home"} />
      <div style={{ height: "70vh" }}>
        <h1 className="flex justify-center mt-2 mb-2">Map</h1>

        <div className="flex flex-col items-center justify-center  ">
          <img src={mapOne} className="object-contain w-full  " alt="" />
          <img src={mapTwo} className="object-contain w-full " alt="" />
          <img src={mapThree} className="object-contain w-full " alt="" />
        </div>
      </div>
    </div>
  );
}

export default MapScreen;
