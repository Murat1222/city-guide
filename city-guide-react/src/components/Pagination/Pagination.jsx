import React from 'react';
import './Pagination.scss';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={handlePrevPage}
        disabled={page === 1}
      >
        Назад
      </button>
      <span className="pagination__info">
        Страница {page} из {totalPages}
      </span>
      <button
        className="pagination__button"
        onClick={handleNextPage}
        disabled={page === totalPages}
      >
        Вперёд
      </button>
    </div>
  );
};

export default Pagination;