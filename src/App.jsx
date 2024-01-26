import { useState } from 'react'
import Sportify from './Components/Sportify'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sportify/>
    </>
  )
}

export default App
