import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Categories from '../components/Categories'
import { Skeleton } from '../components/PizzaBlock/Skeleton.tsx'
import { setCategoryId, setFilters } from '../redux/filter/slice'
import { sortList } from '../components/Sort'

const Home = ({ searchValue }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const categoryId = useSelector(state => state.filter.categoryId)
  const sortBy = useSelector(state => state.filter.sort)
  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  const fetchPizzas = () => {
    setIsLoading(true)

    axios
      .get(
        `https://64664e24ba7110b6639d5185.mockapi.io/items?${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&sortBy=${sortBy.sort}&order=desc`
      )
      .then(res => {
        setItems(res.data)
        setIsLoading(false)
      })
  }

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = sortList.find(obj => obj.sort === params.sort)

      dispatch(
        setFilters({
          ...params,
          sort
        })
      )
      isSearch.current = true
    }
  }, [])

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas()
    }
    isSearch.current = false
  }, [categoryId, sortBy])

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sortBy.sort,
        categoryId
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortBy])

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
          category={categoryId}
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
