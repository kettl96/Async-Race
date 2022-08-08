
import React from 'react';

type PagesLinksType = {
  setGarage: (React.Dispatch<React.SetStateAction<boolean>>)
}

const PagesLinks: React.FC<PagesLinksType> = ({ setGarage }) => {
  return (
    <div>
      <button onClick={() => setGarage(true)}>TO GARAGE</button>
      <button onClick={() => setGarage(false)}>TO WINNERS</button>
    </div >
  )
}

export default PagesLinks