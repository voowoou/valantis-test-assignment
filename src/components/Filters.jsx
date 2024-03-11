import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';

const Filters = () => {
  const { control, watch } = useForm({
    // defaultValues для определения начальных значений поисковой строки
    defaultValues: {
      search: '',
    },
  });

  //const searchText = watch('search'); // "Вотчер" для записи в переменную набранного текста

  const [isBrandMenuVisible, setIsBrandMenuVisible] = useState(false);
  const [isPriceMenuVisible, setIsPriceMenuVisible] = useState(false);

  return (
    <form>
      <Controller
        name="search"
        control={control}
        render={(
          { field }, // field содержит свойства: value, name и др., а также связывает input с RHF-формой
        ) => <input type="search" placeholder="золотое кольцо" {...field} />}
      />
      <div>
        <div
          className="brand"
          onMouseEnter={() => setIsBrandMenuVisible(true)}
          onMouseLeave={() => setIsBrandMenuVisible(false)}
        >
          <span className="angle"></span>
          <span className="filterName">Бренд</span>
        </div>
        <div
          className="price"
          onMouseEnter={() => setIsPriceMenuVisible(true)}
          onMouseLeave={() => setIsPriceMenuVisible(false)}
        >
          <span className="angle"></span>
          <span className="filterName">Цена</span>
        </div>
      </div>
      {isBrandMenuVisible && (
        <div className="brandMenu">
          Здесь должен быть список чекбоксов с брендами, представленными в магазине
        </div>
      )}
      {isPriceMenuVisible && (
        <div className="brandMenu">
          Здесь должен быть фильтр по ценам товаров из магазина
        </div>
      )}
    </form>
  );
};

export default Filters;
