import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import getIds from '../getIds/getIds';
import { selectIds, selectIsLoading, selectHasError } from '../getIds/idsSlice';

export const RenderProducts = () => {
  const dispatch = useDispatch();
  const ids = useSelector(selectIds());

  useEffect(() => {
    // Диспатчим thunk, чтобы осуществить запрос к API
    dispatch(getIds({ offset: 0, limit: 50 }));
  }, [dispatch]);
  return (
    <main>
      <h1>Хей хей</h1>
      <div>
        {ids.map(id => (
          <div key={id}>{id}</div>
        ))}
      </div>
    </main>
  );
};
