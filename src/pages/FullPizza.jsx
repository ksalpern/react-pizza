import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const FullPizza = () => {
  const [pizza, setPizza] = React.useState()

  const { id } = useParams()
  const navigate = useNavigate()

  React.useEffect(() => {
    async function fetchPizza () {
      try {
        const { data } = await axios.get(
          'https://64664e24ba7110b6639d5185.mockapi.io/items/' + id
        )
        setPizza(data)
      } catch (error) {
        alert('Помилка при отриманні піцки')
        navigate('/')
      }
    }

    fetchPizza()
  }, [])

  if (!pizza) {
    return <>Завантаження...</>
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} />
      <h2 className='pizza-block__title'>{pizza.title}</h2>
      <h4 className='pizza-block__price'>{pizza.price} ₴</h4>
      <Link to='/'>
        <button className='button button--outline button--add'>
          <span>Назад</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza
