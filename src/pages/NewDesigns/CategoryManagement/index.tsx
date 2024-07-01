import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import { CategoryType, SortOrder } from 'consts/enum';
import { useGetCategoryList } from 'hooks/category/useGetListCategory';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { useMemo } from 'react';
import CategoryCard from './Components/CategoryCard';

const initialValues = {
  page: 1,
  // perPage: 999,
  textSearch: '',
  sortOrder: SortOrder.ASC,
  sortField: 'createdAt',
  categoryType: CategoryType.DEFAULT,
};

const CategoryManagement = () => {
  //! State
  const { filters, handleSearch, setFilters } = useFiltersHandler(initialValues);
  const { data: category, isLoading: isLoadingList } = useGetCategoryList(filters);
  const data = useMemo(() => {
    return category?.data?.data?.items;
  }, [category]);

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Quote'
      sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}
    >
      <HeadWithSearching
        title='Category Management'
        onSubmitSearch={({ search }) => {
          handleSearch(search);
        }}
        placeholder='Search Category...'
      />
      {isLoadingList ? (
        <CommonStyles.Loading />
      ) : (
        <CategoryCard data={data} setFilters={setFilters} />
      )}
    </CommonStyles.Box>
  );
};

export default CategoryManagement;
