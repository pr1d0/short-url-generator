import { useState } from 'react'
import './App.css'
import HomePage from './page/home' 
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HomePage />
      <Toaster />
    </>
  )
}

export default App
