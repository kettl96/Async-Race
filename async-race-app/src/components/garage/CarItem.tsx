import axios from 'axios';
import React from 'react';
import { CarItemPropsType } from '../../types/types';
import { ReactComponent as Car } from './car.svg'
import g from './Garage.module.css'


const CarItem: React.FC<CarItemPropsType> = ({ id, color, reset, setReset }) => {

  const [engineOn, setEngineOn] = React.useState(false)
  const [startOn, setStartOn] = React.useState(false)

  let requestId: number
  let duration: number
  const [ride, setRide] = React.useState(0)
  const engineStart = async (id: number) => {

    let errStatus = 0
    await axios.patch(`http://127.0.0.1:3000/engine?id=${id}&status=started`)
      .then(res => {
        duration = res.data.distance / res.data.velocity
        axios.patch(`http://127.0.0.1:3000/engine?id=${id}&status=drive`)
          .catch(err => errStatus = err.response.status)
      })
    setEngineOn(!engineOn)


    function animate({ timing, draw, duration }: { timing: any, draw: any, duration: number }) {
      let start = performance.now();

      requestId = requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); // отрисовать её
        if (errStatus === 500) {
          setStartOn(!startOn)
          return cancelAnimationFrame(requestId);
        }
        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }
        if (reset === true) {
          console.log("reset");

        }
        if (timeFraction === 1) {
          if (reset === true) {
            setStartOn(false)
          } else {
            setStartOn(!startOn)
          }
        }
      });
    }

    animate({
      duration: duration,
      timing(timeFraction: any) {
        return timeFraction;
      },
      draw(progress: any) {
        setRide(progress * 100)
      }
    });

  }

  const engineStop = (id: number) => {
    setEngineOn(!engineOn)
    setRide(0)
    setStartOn(false)

  }
  const disableReset = () => {
    cancelAnimationFrame(requestId)
    // setEngineOn(false)
    // return 0
  }
  const rideArr = [{

  }]
  React.useEffect(() => {

  }, [engineOn])
  return (
    <div>
      <div className={g.start__btn}>
        <button disabled={engineOn} id={'btnE'}
          onClick={() => { engineStart(id) }}>
          E
        </button>
        <button disabled={!startOn} id={'btnS'}
          onClick={() => engineStop(id)}>
          S
        </button>
      </div>
      <div className={g.road__wrapper}>
        <div className={g.car}>
          <Car
            key={id}

            className={g.carImg}
            width='90'
            height='40'
            fill={color}
            style={{ left: `${reset ? disableReset() : ride}%` }} />
        </div>
        <img src="finish.svg" alt="" />
      </div>
    </div>
  )
}

export default CarItem