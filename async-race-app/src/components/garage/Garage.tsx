import React from 'react';

import g from './Garage.module.css'
import c from './Create.module.css'

import { carsDataType, GaragePropsType, updateCarType } from '../../types/types'
import axios from 'axios';
import randomArray from './../random/random-array';
import CarItem from './CarItem';
import { AppContext } from './../../App';


const Garage: React.FC<GaragePropsType> = ({ carsData, setCarsData, totalCars, setTotalCar, isGarage }) => {
  const [createValue, setCreateValue] = React.useState('')
  const [createColor, setCreateColor] = React.useState('black')
  const [updateValue, setUpdateValue] = React.useState('')
  const [updateColor, setUpdateColor] = React.useState('')
  const [curId, setCurId] = React.useState(Number)
  let [page, setPage] = React.useState(1)
  const [reset, setReset] = React.useState(false)
  const [start, setStart] = React.useState(false)
  const [raceClick, setRaceClick] = React.useState(false)

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


  let resSpeed: number[] = []
  const [speedArr, setSpeedArr] = React.useState([] as number[])

  const race = () => {
    resSpeed = []
    setRaceClick(true)
    setSpeedArr([])
    setStart(true)

    Promise.allSettled(carsData.map(el => axios.patch(`http://127.0.0.1:3000/engine?id=${el.id}&status=started`)))
      .then(result => {
        result.forEach((res) => {
          if (res.status === 'fulfilled') {
            resSpeed.push(res.value.data.distance / res.value.data.velocity)
          }
          if (res.status === "rejected") {
            console.log(res.reason);
          }
        })
        setSpeedArr(resSpeed)
        setTimeout(() => { setStart(false) }, Math.max(...resSpeed))
      })
  }

  let countWinner = 1
  const [win, setWin] = React.useState(false)
  const [winName, setWinName] = React.useState('')
  const [winTime, setWinTime] = React.useState(0)
  // const winArr: string[] = []
  const { load } = React.useContext(AppContext)

  const postWinners = (postWin: { id: number, wins: number, time: number }) => {
    axios.get(`http://127.0.0.1:3000/winners`)
      .then(res => {
        res.data.forEach((e: { id: number; wins: number, time: number }) => {
          if (e.id === postWin.id) {
            let updWin = { wins: e.wins += 1, time: postWin.time }
            axios.put(`http://127.0.0.1:3000/winners/${postWin.id}`, updWin)
              .then(res => load(1))
            return
          }
        })
        axios.post(`http://127.0.0.1:3000/winners`, postWin)
          .then(res => load(1))
        // console.log(res.data);
      })

  }
  const showWinner = (id: number, name: string, result: number) => {
    if (countWinner === 1) {
      setWinName(name)
      setWinTime(Number(`${result.toString()[0]}.${result.toString()[2]}`))
      countWinner = 0
      setWin(true)
      let postWin = { id: id, wins: 1, time: Number(`${result.toString()[0]}.${result.toString()[2]}`) }
      postWinners(postWin)
    }
  }

  const resetClick = () => {
    setWin(false)
    countWinner = 1
    setReset(true)
  }
  const carItems = (data: carsDataType) => {
    return (
      <>
        {data.map((e, i) => {
          return (
            <div key={e.id}>
              <div className={g.car__header}>
                <button onClick={() => select(e)}>SELECT</button>
                <button onClick={() => remove(e.id)}>REMOVE</button>
                <span>{e.name}</span>
              </div>
              <CarItem
                key={e.id}
                id={e.id}
                color={e.color}
                reset={reset}
                setReset={() => setReset(false)}
                speed={speedArr[i]}
                raceClick={raceClick}
                setRaceClick={setRaceClick}
                showWinner={showWinner}
                name={e.name}
                isStart={start}
              />
            </div>
          )
        })}
      </>
    )
  }


  return (
    <div className={g.wrapper} style={isGarage ? { display: 'block' } : { display: 'none' }}    >
      {win &&
        <div className={g.showWinner}>
          <span>Winner: {winName}</span>
          <span><b>{winTime}s</b></span>
        </div>
      }
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
          <button onClick={race} disabled={start}>RASE</button>
          <button onClick={resetClick}>RESET</button>
          <button onClick={generate}>GENERATE CARS</button>
        </div>
      </div>
      <h3>Garage ({totalCars})</h3>
      <h4>Page # {page}</h4>
      <div className={g.items__wrapper}>
        {carItems(carsData)}
      </div>
      <div className={g.pageBtn}>
        <button disabled={page === 1} onClick={prevPage}>prev</button>
        <button disabled={page === Math.ceil(totalCars / 7)} onClick={nextPage}>next</button>
      </div>
    </div>
  )
}

export default Garage