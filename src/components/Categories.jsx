import React from 'react'

function Categories ({ category, setActiveCategory }) {
  const categories = [
    'Всі',
    "М'ясні",
    'Вегетеріанські',
    'Гриль',
    'Гострі',
    'Закриті'
  ]

  return (
    <div className='categories'>
      <ul>
        {categories.map((categoryName, idx) => (
          <li
            key={idx}
            onClick={() => setActiveCategory(idx)}
            className={category === idx ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
