import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import getIds from '../getIds/getIds';
import getItems from '../getItems/getItems';
import { selectIds, selectIdsIsLoading, selectIdsHasError } from '../getIds/idsSlice';
import {
  selectItems,
  selectItemsIsLoading,
  selectItemsHasError,
} from '../getItems/itemsSlice';

export const RenderProducts = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;

  const idsIsLoading = useSelector(selectIdsIsLoading);
  const idsHasError = useSelector(selectIdsHasError);
  const itemsIsLoading = useSelector(selectItemsIsLoading);
  const itemsHasError = useSelector(selectItemsHasError);

  // Формируем функцию для диспетчеризации getIds
  const fetchIds = () => {
    const getIdsArg = {
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
    };

    dispatch(getIds(getIdsArg));
  };
  useEffect(fetchIds, [page, dispatch]); // Запускаем функцию, обрабатывая сайд-эффект
  const ids = useSelector(selectIds); // Получаем id товаров

  // Если с запросом getIds всё хорошо, то вызываем getItems
  useEffect(() => {
    if (ids.length > 0 && !idsIsLoading && !idsHasError) {
      dispatch(getItems(ids));
    }
  }, [ids, idsIsLoading, idsHasError, dispatch]);
  const items = useSelector(selectItems); // Получаем объекты товаров

  //Хэндлеры нажатий на кнопки пагинации
  const handleNext = () => setPage(prev => prev + 1);
  const handlePrev = () => setPage(prev => prev - 1);

  // Если промисы имеют состояния pending
  if (idsIsLoading || itemsIsLoading) {
    return <div>Загрузка...</div>;
  }

  // Если промисы разрешились с rejected
  if (idsHasError || itemsHasError) {
    return (
      <div>
        <div>Возникла ошибка</div>
        <button onClick={fetchIds}>Повторить запрос</button>
      </div>
    );
  }

  // Если все запросы прошли хорошо
  return (
    <main>
      <h1>Товары:</h1>
      <div>
        {items.map(item => (
          <div key={item.id}>
            <div>
              <span>{item.id}</span>
            </div>
            <div>
              <span>{item.price}</span>
              <span>
                {item.product}
                {item.brand && `, ${item.brand}`}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handlePrev}>Назад</button>
      <button onClick={handleNext}>Вперёд</button>
    </main>
  );
};
