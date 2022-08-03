import React from 'react';
import { CarItemPropsType } from '../../types/types';


const CarItem: React.FC<CarItemPropsType> = ({ id, color, name }) => {
  return (
    <div key={id}>
    <div className={g.car__header}>
      <button onClick={() => select(e)}>SELECT</button>
      <button onClick={() => remove(e.id)}>REMOVE</button>
      <span>{name}</span>
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
        key={id}
        className={g.carImg}
        width='90'
        height='40'
        fill={color}
        style={{ left: `${ride}%`, maxWidth: "90%" }} />
      <img src="finish.svg" alt="" />
    </div>
  </div>
  )
}

export default CarItem