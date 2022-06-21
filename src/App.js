import React,{useState} from 'react'
 import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import AddEdit from './pages/AddEdit'
import Navbar from './components/acc/Navbar'

const App = () => {
 
  return (
    <Router>
      <div className='app'>
      <Navbar/>
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<AddEdit/>}/>
        <Route path='/update/:id' element={<AddEdit/>}/>
      </Routes>
    </div>
    </div>
    </Router>
  )
}

export default App