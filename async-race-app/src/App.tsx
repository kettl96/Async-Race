import React from 'react';
import axios from 'axios';
import './App.css';
import Garage from './components/garage/Garage';
import PagesLinks from './components/pages-links/PagesLinks';
import Winners from './components/winners/Winners';
import { carsDataType } from './types/types';

function App() {
  const [isGarage, setGarage] = React.useState(true)
  const [carsData, setCarsData] = React.useState([] as carsDataType)
  const [totalCars, setTotalCar] = React.useState(Number)
  // const [updateCar, setUpdateCar] = React.useState({} as updateCarType)


  React.useEffect(() => {
    async function fetchData() {
      try {
        const cars = await axios.get('http://127.0.0.1:3000/garage?_page=1&_limit=7')
        setTotalCar(Number(cars.headers['x-total-count']))
        setCarsData(cars.data)
      } catch (error) {
        alert('Please reload the page')
      }
    }
    fetchData()
  }, [])


  return (
    <div className="App">
      <PagesLinks
        isGarage={isGarage}
        setGarage={() => setGarage(!isGarage)}
      />
      <Winners
        isGarage={isGarage}
      />
      <Garage
        isGarage={isGarage}
        carsData={carsData}
        setCarsData={setCarsData}
        totalCars={totalCars}
        setTotalCar={setTotalCar}
      />
    </div>
  );
}

export default App;
