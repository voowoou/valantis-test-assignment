import fetchIds from '../fetchIds/fetchIds';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const RenderProducts = () => {
  const dispatch = useDispatch();
  const allIds = useSelector(state => {
    if (state) {
      return state.ids.allIds;
    }
    return ['Ошибка братья'];
  }); // Выбираем данные из состояния Redux

  useEffect(() => {
    // Диспатчим thunk, чтобы осуществить запрос к API
    dispatch(fetchIds({ offset: 0, limit: 50 }));
  }, [dispatch]); // Вызываем диспатч только при первом рендере компонента

  return (
    <main>
      <h1>Хей хей</h1>
      <div>
        {allIds.map(id => (
          <div key={id}>{id}</div>
        ))}
      </div>
    </main>
  );
};
