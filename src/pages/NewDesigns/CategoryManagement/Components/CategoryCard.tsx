import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import React from 'react';
import DialogAddCategory from './DialogAddCategory';
import ItemCategory from './ItemCategory';
import { ICategory } from 'interfaces/category';

interface CategoryCardProps {
  data: ICategory[];
}

const CategoryCard = (props: CategoryCardProps) => {
  const { data } = props;
  //! State
  const {
    open: openDialog,
    toggle: toggleDialog,
    shouldRender: shouldRenderDialog,
  } = useToggleDialog();

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:CategoryCard'>
      <CommonStyles.Button sx={{ mb: 2 }} onClick={toggleDialog}>
        New Category
      </CommonStyles.Button>
      <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {data?.map((item: ICategory, ind: number) => {
          return <ItemCategory key={ind} item={item} />;
        })}
      </CommonStyles.Box>
      {shouldRenderDialog && <DialogAddCategory isOpen={openDialog} toggle={toggleDialog} />}
    </CommonStyles.Box>
  );
};

export default React.memo(CategoryCard);
