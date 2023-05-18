import React from 'react'

import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton.tsx'
import Sort from '../components/Sort'
import Categories from '../components/Categories'

const Home = () => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    fetch('https://64664e24ba7110b6639d5185.mockapi.io/items')
      .then(res => res.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Всі піци</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </>
  )
}

export default Home
