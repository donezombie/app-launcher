import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { SIZE_ICON_DEFAULT } from 'consts';
import useToggleDialog from 'hooks/useToggleDialog';
import React from 'react';
import DialogAddNews from './DialogAddCategory';
import DialogDeleteNew from './DialogDeleteCategory';
import { ICategory } from 'interfaces/category';

interface ItemCategoryProps {
  item: ICategory;
}
const ItemCategory = (props: ItemCategoryProps) => {
  const { item } = props;
  //! State
  const {
    open: openDialogEdit,
    toggle: toggleDialogEdit,
    shouldRender: shouldRenderDialogEdit,
  } = useToggleDialog();
  const {
    open: openDialogDelete,
    toggle: toggleDialogDelete,
    shouldRender: shouldRenderDialogDelete,
  } = useToggleDialog();

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          justifyContent: 'space-between',
          border: '1px solid #f2f2f2',
          padding: '10px',
          borderRadius: '10px',
        }}
      >
        <CommonStyles.Box maxWidth={250}>
          <CommonStyles.Typography sx={{ flexShrink: 1 }} variant='body2' component='h3'>
            {item.name}
          </CommonStyles.Typography>
        </CommonStyles.Box>
        <CommonStyles.Box
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <CommonIcons.RiEditLine
            size={SIZE_ICON_DEFAULT - 4}
            style={{ marginRight: 12, cursor: 'pointer' }}
            onClick={toggleDialogEdit}
          />
          <CommonIcons.RiDeleteBin7Line
            size={SIZE_ICON_DEFAULT - 4}
            style={{ cursor: 'pointer' }}
            onClick={toggleDialogDelete}
          />
        </CommonStyles.Box>
      </CommonStyles.Box>

      {shouldRenderDialogEdit && (
        <DialogAddNews isOpen={openDialogEdit} toggle={toggleDialogEdit} item={item} />
      )}
      {shouldRenderDialogDelete && (
        <DialogDeleteNew isOpen={openDialogDelete} toggle={toggleDialogDelete} item={item} />
      )}
    </CommonStyles.Box>
  );
};

export default React.memo(ItemCategory);
