import React from 'react'

function OrderButton() {
    function handleclick(){
        alert("food is add")
    }
  return <button onClick={handleclick()}>click</button>
}

export default OrderButton