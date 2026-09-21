import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'
import Header from './componets/header/Header'
import Fotter from './componets/fotter/Fotter'

function App(){
  return (
    <>
    <Header />

    <Router>
      
      <Routes >
        <Route path="/" element={<Home />} name="yasin" price={120}/>
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <nav className='n'>
        <Link className='nav1' to="/">Home</Link>
        <Link className='nav1' to="/menu">Menu</Link>
        <Link className='nav1' to="/about">About</Link>
        <Link className='nav1' to="/contact">checkout</Link>
      </nav>
   </Router>
      
  
    </>
    
  )
}
export default App