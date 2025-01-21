import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './attractions.scss';

function Attractions() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);


  const categories = [
    { name: 'Все', filter: 'all' },
    { name: 'Музеи', filter: 'museum' },
    { name: 'Парки', filter: 'park' },
    { name: 'Мечети', filter: 'mosque' },
    { name: 'Остальное', filter: 'other' },
  ];

  const handleCategoryChange = (filter) => {
    setCategory(filter);
    setPage(1);
  };

  return (
    <div>
      <div className="categories">
        <div className="categories__header">
          <p className="categories__title">Категории</p>
        </div>
        <div className="categories__list">
          {categories.map((categoryItem, index) => (
            <Link
              key={index}
              className={`categories__link ${categoryItem.filter === category ? 'categories__link--active' : ''}`}
              onClick={() => handleCategoryChange(categoryItem.filter)}
            >
              {categoryItem.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="sorting">
        <h2 className="sorting__title">Сортировка</h2>
        <div className="sorting__buttons">
          <button
            className="sorting__button sorting__button--alph"
            onClick={() => {
              setSortBy('title');
              setOrder('asc');
            }}
          >
            По алфавиту
          </button>
          <button
            className="sorting__button sorting__button--reset"
            onClick={() => {
              setSortBy(null);
              setOrder(null);
            }}
          >
            Сбросить
          </button>
        </div>
      </div>
      <main className="attractions">
        <div className="container">
          <div className="attractions__text-block">
            <p className="attractions__text">Достопримечательности</p>
            <div className="attractions__blocks">
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Attractions;