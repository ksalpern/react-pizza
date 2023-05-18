import React from 'react'

function Categories () {
  const [activeIndex, setActiveIndex] = React.useState(0)

  const categories = [
    'Всі',
    "М'ясні",
    'Вегетеріанські',
    'Гриль',
    'Гострі',
    'Закриті'
  ]

  const handleClickCategory = id => {
    setActiveIndex(id)
  }

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, idx) => (
          <li
            key={idx}
            onClick={() => handleClickCategory(idx)}
            className={activeIndex === idx ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
