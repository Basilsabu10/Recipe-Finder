import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Searchbar from './components/searchbar'
import Recipe from './components/Recipe'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Searchbar />} />
        <Route path="/recipe/:idmeal" element={<Recipe />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
