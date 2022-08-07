export type GaragePropsType = {
  isGarage: boolean
  carsData: carsDataType
  setCarsData: (React.Dispatch<React.SetStateAction<carsDataType>>) 
  setTotalCar: (React.Dispatch<React.SetStateAction<number>>) 
  totalCars: number
}
export type carsDataType = {
  name: string
  color: string
  id: number
}[]
export type CreatePropsType = {
  create: (createValue: string, createColor: string) => void
  updateCar: updateCarType
  updateClick: (updateValue: string, updateColor: string, id: number) => void
}

export type updateCarType = {
  name: string
  color: string
  id: number
}
export type WinnersPropsType = {
  isGarage: boolean
}
export type CarItemPropsType = {
  id: number
  color: string
  reset: boolean
  setReset: ()=> void
  speed: number
}