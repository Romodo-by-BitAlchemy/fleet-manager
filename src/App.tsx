/*"use client";

import {
  APIProvider,
  Map,
  //useMap,
  //AdvancedMarker,
} from "@vis.gl/react-google-maps";
//import { MarkerClusterer } from "@googlemaps/markerclusterer";
//import type { Marker as GoogleMarker } from "@googlemaps/markerclusterer";
//import { useEffect, useStaste, useRef } from "react";

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <APIProvider apiKey={"AIzaSyCGsxj90n0CN3hkpQAeb8LAhGYC__wNa3w"}>
        <Map center={{ lat: 43.64, lng: -79.41 }} zoom={10}></Map>
      </APIProvider>
    </div>
  );
}
*/
import * as React from "react";
import Signupf1 from "./components/Signupf1"; // Assuming correct relative path
import Signupf2 from "./components/Signupf2"; // Assuming correct relative path
import Signupf3 from "./components/Signupf3";
import Uname2FA from "./components/Uname2FA";
import Places from "./components/Places";
import "./App.css";

// Main App component
const App: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Signupf1 onNext={handleNext} />;
      // Add cases for other steps (Signupf2, Signupf3) as needed
      case 2:
        return <Signupf2 onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Signupf3 onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <Uname2FA onBack={handleBack} />;
      default:
        return null;
    }
  };

  return <>{renderCurrentStep()}</>;
};

export default App;
