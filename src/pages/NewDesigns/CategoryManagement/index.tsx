import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import CategoryCard from './Components/CategoryCard';
import { useGetListCategory } from 'hooks/category/useGetListCategory';
import { ICategory } from 'interfaces/category';

const CategoryManagement = () => {
  //! State

  const { category, loading: isLoadingList } = useGetListCategory();
  const data = category as ICategory[];

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Quote'
      sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}
    >
      <HeadWithSearching
        title='Category Management'
        onSubmitSearch={() => {}}
        placeholder='Search News...'
      />
      {isLoadingList ? <CommonStyles.Loading /> : <CategoryCard data={data} />}
    </CommonStyles.Box>
  );
};

export default CategoryManagement;
