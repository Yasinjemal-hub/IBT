import React from 'react'
import {useState} from 'react'

function State() {
    const [roomCount, setroomCounter] = useState(1)
    const [isBreakfastIncluded, setisBreakfastIncluded] = useState(true)

    
  return (
    <>
    <button onClick={()=>setroomCounter(roomCount + 1)}>Increment </button>
    <p>{roomCount}</p>
    <button onClick={()=>setroomCounter(roomCount - 1)}>Decrement </button>
    <button onClick={()=>setisBreakfastIncluded(!isBreakfastIncluded)}>Toggle Breakfast</button>
    <p>{isBreakfastIncluded ? "Breakfast is included" : "Breakfast is not included"}</p>
    </>
    
  )
}

export default State