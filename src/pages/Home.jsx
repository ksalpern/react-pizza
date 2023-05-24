import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'

import PizzaBlock from '../components/PizzaBlock'
import Sort from '../components/Sort'
import Categories from '../components/Categories'
import { Skeleton } from '../components/PizzaBlock/Skeleton.tsx'
import { selectFilter, setCategoryId, setFilters } from '../redux/filter/slice'
import { sortList } from '../components/Sort'
import { fetchPizzas, selectPizzaData } from '../redux/pizza/slice'

const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { categoryId, sort, searchValue } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)

  const isSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const getPizzas = async () => {
    const sortByParam = sort.sort
    dispatch(fetchPizzas({ sortByParam, categoryId }))
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
      getPizzas()
    }
    isSearch.current = false
  }, [categoryId, sort])

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sort.sort,
        categoryId
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sort])

  const pizzas = items
    ?.filter(obj => {
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
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>Сталась помилка 😕</h2>
          <p>На жаль не вдалось отримати піцки. Спробуйте пізніше.</p>
        </div>
      ) : (
        <div className='content__items'>
          {status === 'loading'
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : pizzas}
        </div>
      )}
    </>
  )
}

export default Home
