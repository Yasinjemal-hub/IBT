import React from 'react'
import './Dish.css'
import { useState } from 'react'


function Dish({dish}) {
    const {price, name,spicy, category}=dish
const [cart,setCart]=useState([])
const [total, setTotal]=useState(0)
function addToCart(dish){
   setCart([...cart, dish])
   setTotal(total + dish.price)
cart.map((item)=>{
  <div key={item.id}>
         <p>{item.name}={item.price}*{item.qty}</p>
  </div>
})

}
    console.log(dish)
  return (
    <div>
       <div className="dish_item">
         <div className="image">
            <img src="" alt="" />
         </div>
         <div className='name'>{name}</div>
        <div>{category}</div>
        <p className='spicy'>{spicy?<div>🌶️ Spice</div> : null}</p>
          <div>{price}</div>
          <button >add</button>
       </div>
    </div>
  )
}

export default Dish