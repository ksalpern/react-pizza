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

  return (
    <div className='categories'>
      <ul>
        {categories.map((item, idx) => (
          <li
            key={idx}
            onClick={() => setActiveIndex(idx)}
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
