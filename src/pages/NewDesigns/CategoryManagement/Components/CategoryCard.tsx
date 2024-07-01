import CommonStyles from 'components/CommonStyles';
import useToggleDialog from 'hooks/useToggleDialog';
import React, { Dispatch, SetStateAction, useState } from 'react';
import DialogAddCategory from './DialogAddCategory';
import ItemCategory from './ItemCategory';
import { Category } from 'interfaces/category';
import { CategoryType, SortOrder } from 'consts/enum';
import { upperFirst } from 'lodash';
import { CommonFilters } from 'interfaces/common';

interface CategoryCardProps {
  data: Category[] | undefined;
  setFilters: Dispatch<
    SetStateAction<
      {
        page: number;
        perPage?: number;
        textSearch: string;
        sortOrder: SortOrder;
        sortField: string;
        categoryType: CategoryType;
      } & CommonFilters
    >
  >;
}

const tabs = [
  {
    label: upperFirst(CategoryType.DEFAULT.toLocaleLowerCase()),
    value: CategoryType.DEFAULT,
  },
  {
    label: upperFirst(CategoryType.REPORT.toLocaleLowerCase()),
    value: CategoryType.REPORT,
  },
];

const CategoryCard = (props: CategoryCardProps) => {
  const { data, setFilters } = props;
  const [tab, setTab] = useState(CategoryType.DEFAULT);
  //! State
  const {
    open: openDialog,
    toggle: toggleDialog,
    shouldRender: shouldRenderDialog,
  } = useToggleDialog();

  //! Function
  const renderTab = () => {
    return (
      <CommonStyles.Box sx={{ display: 'flex', mb: 2 }}>
        {tabs.map((item) => {
          const isActive = tab === item.value;
          return (
            <CommonStyles.Box
              key={item.value}
              sx={{
                padding: 1,
                marginRight: 2,
                borderBottom: isActive ? '2px solid' : '',
                cursor: 'pointer',
              }}
              onClick={() => {
                setTab(item.value);
                setFilters((prev) => ({
                  ...prev,
                  categoryType: item.value,
                }));
              }}
            >
              <CommonStyles.Typography sx={{ fontWeight: 'bold' }}>
                {item.label}
              </CommonStyles.Typography>
            </CommonStyles.Box>
          );
        })}
      </CommonStyles.Box>
    );
  };
  //! Render
  return (
    <CommonStyles.Box className='component:CategoryCard'>
      <CommonStyles.Button sx={{ mb: 2 }} onClick={toggleDialog}>
        New Category
      </CommonStyles.Button>
      {renderTab()}
      <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
        {data?.map((item, ind) => {
          return <ItemCategory key={ind} item={item} />;
        })}
      </CommonStyles.Box>
      {shouldRenderDialog && <DialogAddCategory isOpen={openDialog} toggle={toggleDialog} />}
    </CommonStyles.Box>
  );
};

export default React.memo(CategoryCard);
