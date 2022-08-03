
type PagesLinksType = {
  isGarage: boolean
  setGarage: () => void
}
const PagesLinks: React.FC<PagesLinksType> = ({ isGarage, setGarage }) => {
  return (
    <div>
      <button onClick={setGarage}>TO GARAGE</button>
      <button onClick={setGarage}>TO WINNERS</button>
    </div>
  )
}

export default PagesLinks