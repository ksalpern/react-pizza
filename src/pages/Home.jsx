import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Categories from '../components/Categories'
import { Skeleton } from '../components/PizzaBlock/Skeleton.tsx'
import { setCategoryId } from '../redux/filter/slice'

const Home = ({ searchValue }) => {
  const dispatch = useDispatch()
  const activeCategory = useSelector(state => state.filter.categoryId)
  const sortBy = useSelector(state => state.filter.sort)

  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(true)

    axios
      .get(
        `https://64664e24ba7110b6639d5185.mockapi.io/items?${
          activeCategory > 0 ? `category=${activeCategory}` : ''
        }&sortBy=${sortBy.sort}&order=desc`
      )
      .then(res => {
        setItems(res.data)
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
          setActiveCategory={i => dispatch(setCategoryId(i))}
        />
        <Sort />
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
