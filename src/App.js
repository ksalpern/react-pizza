import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss'

import pizzas from './pizzas.json'

function App() {

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
            {pizzas.map((pizza) => (
              <PizzaBlock {...pizza} />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
