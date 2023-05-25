import React from 'react';
import { Link } from 'react-router-dom';

export const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Корзина порожня <span>😕</span>
    </h2>
    <p>
      Скоріш за все, ви ще не замовляли піцку.
      <br />
      Для цього перейдіть на головну сторінку.
    </p>
    <img src="/assets/img/empty-cart.png" alt="Empty cart" />
    <Link to="/" className="button button--black">
      <span>Повернутися назад</span>
    </Link>
  </div>
);
