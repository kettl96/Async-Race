import { WinnersPropsType } from '../../types/types'
import s from './Winner.module.css'

const Winners: React.FC<WinnersPropsType> = ({ isGarage }) => {
  return (
    <div className={s.wrapper} style={isGarage? {display: 'none'} : {display: 'block'}}>
      123
    </div>
  )
}

export default Winners