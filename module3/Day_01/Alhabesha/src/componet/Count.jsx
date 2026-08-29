import React from 'react'
import { useState } from 'react'
import './Count.css'


function Count() {
    const[count, setcount]=useState(0)
  return (

    <div>
        <button className='count' onClick={()=>setcount(count+1)}>{count}</button>
    </div>
  )
}

export default Count