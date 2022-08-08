import React from 'react';
import axios from 'axios';
import './App.css';
import Garage from './components/garage/Garage';
import PagesLinks from './components/pages-links/PagesLinks';
import Winners from './components/winners/Winners';
import { carsDataType, winnersType } from './types/types';

export const AppContext = React.createContext({} as any)

function App() {
  const [isGarage, setGarage] = React.useState(true)
  const [carsData, setCarsData] = React.useState([] as carsDataType)
  const [totalCars, setTotalCar] = React.useState(Number)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cars = await axios.get('http://127.0.0.1:3000/garage?_page=1&_limit=7')
        setTotalCar(Number(cars.headers['x-total-count']))
        setCarsData(cars.data)
        load(1)

      } catch (error) {
        alert('Please reload the page')
      }
    }
    fetchData()
  }, [])


  const [winners, setWinners] = React.useState([] as winnersType)
  const [totalWinners, setTotalWinners] = React.useState(0)
  function load(page: number) {
    let winArr: winnersType = []
    // console.log('rase start');
    console.log(page);

    axios.get(`http://127.0.0.1:3000/winners?_page=${page}&_limit=10`)
      .then(res => {


        setTotalWinners(Number(res.headers['x-total-count']))
        res.data.forEach((el: { id: number, wins: number, time: number }) => {
          axios.get(`http://127.0.0.1:3000/garage/${el.id}`)
            .then(response => {
              let result = Object.assign(response.data, el)
              winArr.push(result)
            })
        })

        setWinners(winArr)
      })
    setTimeout(() => console.log(winArr), 1000)
    console.log(winners);
  }
  return (
    <AppContext.Provider value={{ load }}>

      <div className="App">
        <PagesLinks
          isGarage={isGarage}
          setGarage={() => setGarage(!isGarage)}
        />
        <Winners
          isGarage={isGarage}
          winners={winners}
          totalWinners={totalWinners}
          setWinners={setWinners}
        />
        <Garage
          isGarage={isGarage}
          carsData={carsData}
          setCarsData={setCarsData}
          totalCars={totalCars}
          setTotalCar={setTotalCar}
        />
      </div>
    </AppContext.Provider>

  );
}

export default App;
