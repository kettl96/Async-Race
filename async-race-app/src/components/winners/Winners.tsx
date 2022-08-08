import { WinnersPropsType, winnersType } from '../../types/types'
import s from './Winner.module.css'
import React from 'react';
import axios from 'axios';
import { AppContext } from './../../App';
import g from '../garage/Garage.module.css'
import { ReactComponent as Car } from '../garage/car.svg'



const Winners: React.FC<WinnersPropsType> = ({ isGarage, winners, totalWinners, setWinners }) => {
  // console.log(winners);

  // const [winners, setWinners] = React.useState([] as winnersType)
  // const [totalWinners, setTotalWinners] = React.useState(0)
  const { load } = React.useContext(AppContext)

  let [page, setPage] = React.useState(1)



  // React.useEffect(() => {
  //   load(1)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // React.useEffect(() => {
  //   load(1)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [winners])
  const nextPage = () => {
    setPage((page += 1))
    load(page)
  }
  const prevPage = () => {
    setPage((page += -1))
    load(page)
  }
  let timeSortCount = 0
  const timeSort = () => {
    console.log(

      winners.sort((a, b) => a.time - b.time)
    );
    let sortArr = winners.sort((a, b) => a.time - b.time)
    setWinners(sortArr)
    if (timeSortCount % 2 === 0) {
    }
  }
  const winnerItem = (winners: winnersType) => {
    return winners.map((e, i) => {
      return (
        <div key={i} className={s.winner}>
          <div>{i + 1}</div>
          <div><Car
            className={g.carImg}
            width='50'
            height='40'
            fill={e.color}
          /></div>
          <div className={s.name}>{e.name}</div>
          <div className={s.wins}>{e.wins}</div>
          <div>{e.time}</div>
        </div>
      )
    })
  }
  return (
    <div className={s.wrapper} style={isGarage ? { display: 'none' } : { display: 'block' }}>
      <h4>Winners: ({totalWinners})</h4>
      <div>Page #{page}</div>
      <div className={s.winnerHeader}>
        <div>Number</div>
        <div>Car</div>
        <div className={s.headerName}>Name</div>
        <div className={s.headerWins} >Wins</div>
        <div className={s.headerTime} onClick={timeSort}>Time(s)</div>
      </div>
      {/* {winners.map((e, i) => {
        return (
          <div key={e.id} className={s.winner}>
            <div>{i + 1}</div>
            <div><Car
              className={g.carImg}
              width='50'
              height='40'
              fill={e.color}
            /></div>
            <div className={s.name}>{e.name}</div>
            <div className={s.wins}>{e.wins}</div>
            <div>{e.time}</div>
          </div>
        )
      })} */}
      {winnerItem(winners)}
      <div className={g.pageBtn}>
        <button disabled={page === 1} onClick={prevPage}>prev</button>
        <button disabled={page === Math.ceil(totalWinners / 10)} onClick={nextPage}>next</button>
      </div>
    </div>
  )
}

export default Winners