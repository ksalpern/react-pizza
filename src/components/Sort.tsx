import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SortPropertyEnum, selectSort, setSort } from '../redux/filter/slice';

type SortItem = {
  name: string;
  sort: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  path: Node[];
};

export const sortList: SortItem[] = [
  { name: 'популярності', sort: SortPropertyEnum.RATING },
  { name: 'ціні', sort: SortPropertyEnum.PRICE },
  { name: 'алфавіту', sort: SortPropertyEnum.TITLE },
];

const Sort: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const sortBy = useSelector(selectSort);

  const sortRef = React.useRef<HTMLDivElement>(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleSortBy = (obj: SortItem) => {
    dispatch(setSort(obj));
    setOpen(!open);
  };
  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортування по:</b>
        <span onClick={() => setOpen(!open)}>{sortBy.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, idx) => (
              <li
                key={idx}
                onClick={() => handleSortBy(obj)}
                className={sortBy.sort === obj.sort ? 'active' : ''}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
