import * as React from "react";
import Signupf1 from "./components/Signupf1"; // Assuming correct relative path
import Signupf2 from "./components/Signupf2"; // Assuming correct relative path
import Signupf3 from "./components/Signupf3";
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
      default:
        return null;
    }
  };

  return <>{renderCurrentStep()}</>;
};

export default App;
