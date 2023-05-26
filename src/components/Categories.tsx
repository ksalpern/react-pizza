import React from 'react';
type CategoriesProps = {
  category: number;
  setActiveCategory: (idx: number) => void;
};

const categories = ['Всі', "М'ясні", 'Вегетеріанські', 'Гриль', 'Гострі', 'Закриті'];

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ category, setActiveCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, idx) => (
            <li
              key={idx}
              onClick={() => setActiveCategory(idx)}
              className={category === idx ? 'active' : ''}>
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
