
import Search from './componets/SearchForm'
// import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
// import Home from './pages/Home'
// import State from './componets/State'
// import Menu from './pages/Menu'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Checkout from './utils/Checkout'
// import './App.css'
// import Header from './componets/header/Header'
// import Fotter from './componets/fotter/Fotter'
// import ErrorBoundary from './utils/Checkout'
// import FallbackComponent from './utils/ErrorBoundary'

function App(){
  return (
    <>
    <Search />

    {/* <Header /> */}
    {/* <State /> */}

    {/* <Router>

      <ErrorBoundary FallbackComponent={FallbackComponent}>
</ErrorBoundary>
      
      <Routes >
        <Route path="/" element={<Home />} name="yasin" price={120}/>
        <Route path="/menu" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path='/Checkout' element={<Checkout/>}/>
      </Routes>

      <nav className='n'>
        <Link className='nav1' to="/">Home</Link>
        <Link className='nav1' to="/menu">Menu</Link>
        <Link className='nav1' to="/about">About</Link>
        <Link className='nav1' to="/Checkout">checkout</Link>
      </nav>
   </Router> */}
      
  
    </>
    
  )
}
export default App