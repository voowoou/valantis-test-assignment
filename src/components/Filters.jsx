import { useForm, Controller } from 'react-hook-form';

const Filters = () => {
  const { control, watch } = useForm({
    // defaultValues для определения начальных значений поисковой строки
    defaultValues: {
      search: '',
    },
  });

  const searchText = watch('search'); // "Вотчер" для записи в переменную набранного текста

  return (
    <form>
      <Controller
        name="search"
        control={control}
        render={(
          { field }, // field содержит свойства: value, name и др., а также связывает input с RHF-формой
        ) => <input type="search" placeholder="золотое кольцо" {...field} />}
      />
      <div className="sorting">
        <div className="brand">
          <div></div>
          <span>Бренд</span>
        </div>
        <div className="price">
          <div></div>
          <span>Цена</span>
        </div>
      </div>
    </form>
  );
};

export default Filters;
