import React from 'react'
import './Dish.css'

function Dish({dish}) {
    const {price, name,spicy, category}=dish
    console.log(dish)
  return (
    <div>
       <div className="dish_item">
         <div className="image">
            <img src="" alt="" />
         </div>
         <div>{name}</div>
        <p className='spicy'>{spicy?<div>🌶️ Spice</div> : null}</p>
        <div>{category}</div>
          <div>{price}</div>
       </div>
    </div>
  )
}

export default Dish