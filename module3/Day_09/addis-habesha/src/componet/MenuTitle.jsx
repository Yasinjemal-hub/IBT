import React from 'react'
import { useState, useEffect } from 'react'
function MenuTitle() {
    const[count, setCount] = useState(0)
  
    useEffect(() => {
        document.title = `You clicked ${count} times`;

    },
    
  [count])  
  

  return <button onClick={() => setCount(count + 1)}>Add</button> 

}

export default MenuTitle