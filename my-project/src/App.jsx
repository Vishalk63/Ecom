import './App.css'
import AllRoutes from './components/AllRoutes'
import { Toaster } from './components/ui/sonner'

function App() {


  return (
    <>
      <div className='bg-gray-100 w-full h-full' >
        <AllRoutes />
        <Toaster/>
      </div>
    </>
  )
}

export default App
