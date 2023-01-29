import React from 'react'
import {BrowserRouter,Link,Route ,Routes} from 'react-router-dom'
// import {logo} from './assets'
import {Home,CreatePost} from './pages'
const App = () => {
  return (
  <BrowserRouter>
  <header className='w-full flex flex-row items-center justify-between px-8  sm:px-8 py-4 border-b border-b-[#e6ebf4] '>
  <Link to={'/'}>
  
    <img src="logo.svg" alt="" className="w-[70px]" />
  
  </Link>
  <Link to={'/Create-post'}>

    <button className="font-inter font-medium bg-[#6469ff] text-white p-2 rounded-md border-none outline-none">Create</button>
  </Link>

  </header>
  <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] '>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Create-post' element={<CreatePost/>} />
    </Routes>
    </main>  
  
  </BrowserRouter>
  )
}

export default App