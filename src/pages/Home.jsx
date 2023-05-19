import React from 'react'

import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton.tsx'
import Sort from '../components/Sort'
import Categories from '../components/Categories'

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [activeCategory, setActiveCategory] = React.useState(0)
  const [sortBy, setSortBy] = React.useState({
    name: 'популярності',
    sort: 'rating'
  })

  React.useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://64664e24ba7110b6639d5185.mockapi.io/items?${
        activeCategory > 0 ? `category=${activeCategory}` : ''
      }&sortBy=${sortBy.sort}&order=desc`
    )
      .then(res => res.json())
      .then(arr => {
        setItems(arr)
        setIsLoading(false)
      })
  }, [activeCategory, sortBy])
  const pizzas = items
    .filter(obj => {
      if (
        obj.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      ) {
        return true
      }
      return false
    })
    .map(pizza => <PizzaBlock key={pizza.id} {...pizza} />)
  return (
    <>
      <div className='content__top'>
        <Categories
          category={activeCategory}
          setActiveCategory={i => setActiveCategory(i)}
        />
        <Sort sortBy={sortBy} setSortBy={i => setSortBy(i)} />
      </div>
      <h2 className='content__title'>Всі піци</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzas}
      </div>
    </>
  )
}

export default Home
