
type PagesLinksType = {
  isGarage: boolean
  setGarage: (React.Dispatch<React.SetStateAction<boolean>>)
  // loadWinners: () => void
}
const PagesLinks: React.FC<PagesLinksType> = ({  setGarage }) => {
  return (
    <div>
      <button onClick={()=>setGarage(true)}>TO GARAGE</button>
      <button onClick={() => setGarage(false)}>TO WINNERS</button>
    </div >
  )
}

export default PagesLinks