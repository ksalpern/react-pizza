import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss'

import Header from './components/Header';
import Home from './pages/Home';
import NotFoundBlock from './pages/NotFound';
import Cart from './pages/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './redux/filter/slice';

function App() {
  const [searchValue, setSearchValue] = React.useState('')
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="wrapper">
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="*" element={<NotFoundBlock />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
