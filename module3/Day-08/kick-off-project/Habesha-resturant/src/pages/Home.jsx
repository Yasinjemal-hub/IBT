import React from 'react'
import App from '../App'
import   "../Data/data"

export default function Home(data) {
  const { id, price } = data;
  return (
    <div>
      <h1>welcome to home</h1>
      <p>Name: {id}</p>
      <p>Price: {price}</p>
    </div>
  )
}

