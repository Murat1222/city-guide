import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AttractionCard from '../../components/AttractionCard/AttractionCard';
import { useAttractionsQuery } from '../../components/Api/useAttractionsQuery';
import { getLoadingIndicator } from '../../components/Utils/Utils';
import SearchComponent from '../../components/Search/Search';
import Pagination from '../../components/Pagination/Pagination';
import './attractions.scss';

function Attractions() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');

  const itemsPerPage = 10;

  const { data, isLoading, isError } = useAttractionsQuery({
    category: category !== 'all' ? category : undefined,
    sortBy,
    order,
  });

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

  const handleSearch = (title) => {
    setSearchTitle(title.toLowerCase());
    setPage(1);
  };

  const attractions = Array.isArray(data) ? data : [];
  const filteredAttractions = attractions.filter((attraction) =>
    attraction.title.toLowerCase().includes(searchTitle)
  );

  const totalAttractions = filteredAttractions.length;
  const totalPages = Math.ceil(totalAttractions / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const currentAttractions = filteredAttractions.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      <div className="categories">
        <div className="categories__header">
          <p className="categories__title">Категории</p>
        </div>
        <div className="categories__list">
          {categories.map((categoryItem, index) => (
            <Link
              key={index}
              className={`categories__link ${
                categoryItem.filter === category ? 'categories__link--active' : ''
              }`}
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
            {isLoading && getLoadingIndicator()}
            <div className="attractions__blocks">
              {isError && <p>Произошла ошибка при загрузке данных.</p>}
              {currentAttractions.length > 0 ? (
                currentAttractions.map((attraction) => (
                  <AttractionCard key={attraction.id} {...attraction} />
                ))
              ) : (
                !isLoading && !isError && <p>Нет доступных достопримечательностей.</p>
              )}
            </div>
            <Pagination 
              page={page} 
              totalPages={totalPages} 
              onPageChange={setPage} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Attractions;