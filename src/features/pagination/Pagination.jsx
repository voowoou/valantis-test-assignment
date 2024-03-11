import './Pagination.sass';

const Pagination = ({ page, setPage }) => {
  //Хэндлеры нажатий на кнопки пагинации
  const handleNext = () => setPage(prev => prev + 1);
  const handlePrev = () => {
    if (page > 1) {
      setPage(prev => prev - 1); // Если страничка первая, то переместиться назад нельзя
    }
  };

  return (
    <div className="buttonsContainer">
      <button className="button" onClick={handlePrev} disabled={page === 1}>
        Назад
      </button>
      <button className="button" onClick={handleNext}>
        Вперёд
      </button>
    </div>
  );
};

export default Pagination;
