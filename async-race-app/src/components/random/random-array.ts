import nameRandom from './random-name';
import colorRandom from './random-color';

const randomArray = () => {
  const res = []
  for (let i = 0; i < 100; i++) {
    res.push({
      name: nameRandom(),
      color: colorRandom()
    })
  }
  return res
}

export default randomArray