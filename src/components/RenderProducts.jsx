import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import getIds from '../features/getIds/getIds';
import getItems from '../features/getItems/getItems';
import {
  selectIds,
  selectIdsIsLoading,
  selectIdsHasError,
} from '../features/getIds/idsSlice';
import { selectItems, selectItemsIsLoading } from '../features/getItems/itemsSlice';
import { Pagination } from '../features/pagination/Pagination';

export const RenderProducts = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const itemsPerPage = 50;

  const idsIsLoading = useSelector(selectIdsIsLoading);
  const idsHasError = useSelector(selectIdsHasError);
  const itemsIsLoading = useSelector(selectItemsIsLoading);

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
    if (Array.isArray(ids) && !idsIsLoading && !idsHasError) {
      dispatch(getItems(ids));
    }
  }, [ids, idsIsLoading, idsHasError, dispatch]);
  const items = useSelector(selectItems); // Получаем объекты товаров

  // Если промисы имеют состояния pending
  if (idsIsLoading || itemsIsLoading) {
    console.log('ids: ' + idsIsLoading + '    items: ' + itemsIsLoading);
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
