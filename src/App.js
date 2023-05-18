import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss'

import React from 'react';

function App() {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    fetch('https://64664e24ba7110b6639d5185.mockapi.io/items')
      .then((res) => res.json())
      .then((arr) => setItems(arr))
  }, [])


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Всі піци</h2>
          <div className="content__items">
            {items.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
