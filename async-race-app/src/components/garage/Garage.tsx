import React from 'react';

import g from './Garage.module.css'
import c from './Create.module.css'

import { ReactComponent as Car } from './car.svg'
import { carsDataType, GaragePropsType, updateCarType } from '../../types/types'
import axios from 'axios';
import randomArray from './../random/random-array';
// import CarItem from './CarItem';


const Garage: React.FC<GaragePropsType> = ({ carsData, setCarsData, totalCars, setTotalCar, isGarage }) => {
  const [createValue, setCreateValue] = React.useState('')
  const [createColor, setCreateColor] = React.useState('black')
  const [updateValue, setUpdateValue] = React.useState('')
  const [updateColor, setUpdateColor] = React.useState('')
  const [curId, setCurId] = React.useState(Number)
  let [page, setPage] = React.useState(1)
  const [engineOn, setEngineOn] = React.useState(false)

  const create = (createValue: string, createColor: string) => {
    const newCar = {
      name: createValue,
      color: createColor,
    }
    axios.post('http://127.0.0.1:3000/garage', newCar)
    axios.get('http://127.0.0.1:3000/garage?_page=1&_limit=7')
      .then(res => setCarsData(res.data))
    setTotalCar(totalCars += 1)
  }
  const remove = (id: number) => {
    setCarsData(carsData.filter((el) => el.id !== id))
    axios.delete(`http://127.0.0.1:3000/garage/${id}`)
    setTotalCar(totalCars += -1)
  }

  const updateClick = async (updateValue: string, updateColor: string, id: number) => {
    const upd = {
      name: updateValue,
      color: updateColor,
    }
    await axios.put(`http://127.0.0.1:3000/garage/${id}`, upd)
    await axios.get(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`)
      .then(res => {
        setCarsData(res.data)
        setUpdateValue('')
        setUpdateColor('black')
      })
  }

  const newValue = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCreateValue(event.target.value)
  }
  const newColor = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setCreateColor(event.target.value)
  }
  const updColor = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUpdateColor(event.target.value)
  }
  const updValue = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setUpdateValue(event.target.value)
  }

  const select = (obj: updateCarType) => {
    setUpdateValue(obj.name)
    setUpdateColor(obj.color)
    setCurId(obj.id)
  }

  const nextPage = () => {
    setPage((page += 1))
    axios.get(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`)
      .then(res => setCarsData(res.data))
  }
  const prevPage = () => {
    setPage((page += -1))
    axios.get(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`)
      .then(res => setCarsData(res.data))
  }

  const generate = () => {
    let arr = randomArray()

    arr.forEach(e => {
      axios.post('http://127.0.0.1:3000/garage', e)
    })
    axios.get(`http://127.0.0.1:3000/garage?_page=${page}&_limit=7`)
      .then(res => {
        setTotalCar(Number(res.headers['x-total-count']))
        setCarsData(res.data)
      })
  }


  let duration: number
  let progress: number
  const [ride, setRide] = React.useState(0)
  const engineStart = (id: number) => {

    axios.patch(`http://127.0.0.1:3000/engine?id=${id}&status=started`)
      .then(res => duration = res.data.distance / res.data.velocity)
    // setInterval(() => { setRide(ride + 20) }, 1000)
    // console.log(carImg.current);
    // const start = performance.now();
    // progress = start / duration
    // console.log(duration);
    // setRide(progress)
    function animate({ timing, draw, duration }: any) {

      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }

      });
    }
    animate({
      duration: 1000,
      timing(timeFraction: any) {
        return timeFraction;
      },
      draw(progress: any) {
        setRide(progress * 100)
      }
    });
    console.log(ride);

  }


  const carItems = (data: carsDataType) => {

    return (
      <>
        {data.map(e => {
          return (
            <div key={e.id}>
              <div className={g.car__header}>
                <button onClick={() => select(e)}>SELECT</button>
                <button onClick={() => remove(e.id)}>REMOVE</button>
                <span>{e.name}</span>
              </div>
              <div className={g.start__btn}>
                <button disabled={engineOn}
                  onClick={() => engineStart(e.id)}>
                  E
                </button>
                <button disabled={!engineOn}>S</button>
              </div>
              <div className={g.road__wrapper}>
                <Car
                  key={e.id}
                  className={g.carImg}
                  width='90'
                  height='40'
                  fill={e.color}
                  style={{ left: `${ride}%`, maxWidth: "90%" }} />
                <img src="finish.svg" alt="" />
              </div>
            </div>
          )
        })}
      </>
    )
  }

  return (
    <div className={g.wrapper} style={isGarage ? { display: 'block' } : { display: 'none' }}>
      <div className={c.wrapper}>
        <div className={c.inputWrapper}>
          <input type="text"
            onChange={newValue} />
          <input type="color"
            onChange={newColor} />
          <button onClick={() => create(createValue, createColor)}>CREATE</button>
        </div>
        <div className={c.inputWrapper}>
          <input type="text"
            onChange={updValue}
            value={updateValue}
          />
          <input type="color"
            onChange={updColor}
            value={updateColor}
          />
          <button
            onClick={() => updateClick(updateValue, updateColor, curId)}>UPDATE</button>
        </div>
        <div className={c.buttonWrapper}>
          <button>RASE</button>
          <button>RESET</button>
          <button onClick={generate}>GENERATE CARS</button>
        </div>
      </div>
      <h3>Garage ({totalCars})</h3>
      <h4>Page # {page}</h4>

      <div className={g.items__wrapper}>
        {carItems(carsData)}
        {/* {
          carsData.map(e => {
            return (
              <CarItem 
              key={e.id}
              id={e.id}
              color={e.color}
              name={e.name}
              />
            )
          })
        } */}
      </div>
      <div className={g.pageBtn}>
        <button disabled={page === 1} onClick={prevPage}>prev</button>
        <button disabled={page === Math.ceil(totalCars / 7)} onClick={nextPage}>next</button>
      </div>
    </div>
  )
}

export default Garage