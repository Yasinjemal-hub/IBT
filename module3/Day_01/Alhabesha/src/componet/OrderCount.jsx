import React, { useState } from 'react'

function OrderCount() {
    const [count, setCount]=useState(0)
  return (
    <div>
        <button onClick={()=>setCount(count+4)}>
            order: {count}
        </button>
        
    </div>
  )
 
}

export default OrderCount