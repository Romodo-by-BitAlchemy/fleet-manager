//App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehicleReport from './Pages/VehicleReportPage';
import NavigationBar from './components/NavigationBar';
import PassengerReportPage from './Pages/PassengerReportPage';
import DriversReport from './Pages/DriversReport';


function App() {
  return (
    <Router>
      <Routes>
      <Route  path="/" element={<NavigationBar/>} />
      <Route  path="/reports/vehicle-details" element={<VehicleReport/>} />
      <Route  path="/reports/passenger-details" element={<PassengerReportPage/>} />
      <Route  path="/reports/driver-details" element={<DriversReport/>} />
    </Routes>
    </Router>
  );
}

export default App;




// import React from 'react'
// import PrintButton from './components/PrintButton';

// const App = () => {
//   return (
//     <div> <PrintButton /></div>
//   )
// }

// export default App