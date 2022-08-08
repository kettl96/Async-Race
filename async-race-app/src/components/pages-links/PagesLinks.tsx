
type PagesLinksType = {
  isGarage: boolean
  setGarage: () => void
  // loadWinners: () => void
}
const PagesLinks: React.FC<PagesLinksType> = ({  setGarage }) => {
  return (
    <div>
      <button onClick={setGarage}>TO GARAGE</button>
      <button onClick={() => {setGarage(); }}>TO WINNERS</button>
    </div >
  )
}

export default PagesLinks