import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import getIds from '../features/getIds/getIds';
import getItems from '../features/getItems/getItems';
import {
  selectIds,
  selectIdsIsLoading,
  selectIdsHasError,
} from '../features/getIds/idsSlice';
import {
  selectItems,
  selectItemsIsLoading,
  selectItemsHasError,
} from '../features/getItems/itemsSlice';
import Pagination from '../features/pagination/Pagination';

const RenderProducts = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;
  const offset = (page - 1) * itemsPerPage;

  // Формируем функцию для диспетчеризации getIds
  const fetchIds = () => {
    dispatch(getIds());
  };
  useEffect(fetchIds, [page, dispatch]); // Запускаем функцию, обрабатывая сайд-эффект
  const ids = useSelector(selectIds); // Получаем id товаров
  const idsIsLoading = useSelector(selectIdsIsLoading); // Загружаются ли id
  const idsHasError = useSelector(selectIdsHasError); // Завершился ли запрос с ошибкой
  console.log('ID: ', ids, '   Ошибки: ', idsHasError);

  // Если с запросом getIds всё хорошо, то вызываем getItems
  useEffect(() => {
    if (Array.isArray(ids) && ids.length > 0) {
      // Вырезаем кусок массива ids с учетом offset и itemsPerPage
      const slicedIds = ids.slice(offset, offset + itemsPerPage);
      dispatch(getItems(slicedIds));
    }
  }, [ids, dispatch, offset]);

  const items = useSelector(selectItems); // Получаем объекты товаров
  const itemsIsLoading = useSelector(selectItemsIsLoading); // Загружаются ли items
  const itemsHasError = useSelector(selectItemsHasError); // Завершился ли запрос с ошибкой
  console.log('Товары: ', items, '   Ошибки: ', itemsHasError);

  // Если есть ошибки
  useEffect(() => {
    if (idsHasError || itemsHasError) {
      dispatch(getIds());
    }
  }, [idsHasError, itemsHasError, dispatch]);

  // Если промисы имеют состояния pending
  if (idsIsLoading || itemsIsLoading) {
    return <div>Загрузка...</div>;
  }

  // Если все запросы прошли хорошо
  return (
    <main>
      <div className="content">
        {Array.isArray(items) && // Проверим, что items не undefined
          items.map(item => (
            <div key={item.id} className="productCard">
              <div>
                <span className="productId">{item.id}</span>
              </div>
              <div className="productInfo">
                <span className="productPrice">{item.price}</span>
                <span className="productName">
                  {item.product}
                  {item.brand && `, ${item.brand}`}
                </span>
              </div>
            </div>
          ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </main>
  );
};

export default RenderProducts;
