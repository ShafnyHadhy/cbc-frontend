import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductCard from './components/productCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='h-[700px] w-[700px] relative border-[5px] flex justify-center items-center'>
      <div className='h-[600px] w-[600px] bg-yellow-300 flex flex-row justify-center items-center'>
        <div className='h-[100px] w-[100px] bg-red-500'></div>
        <div className='h-[100px] w-[100px] bg-blue-500'></div>
        <div className='h-[100px] w-[100px] absolute right-[20px] bottom-[20px] bg-green-500'></div>
        <div className='h-[100px] w-[100px] fixed right-[10px] bottom-[10px] bg-pink-500'></div>
        <div className='h-[100px] w-[100px] bg-gray-500'></div>
      </div>
    </div>
    </>
  )
}

export default App
