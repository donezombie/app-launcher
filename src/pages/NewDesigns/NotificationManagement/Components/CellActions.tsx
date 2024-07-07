import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';
import useToggleDialog from 'hooks/useToggleDialog';
import { SIZE_ICON_DEFAULT } from 'consts';
import DialogAddNotification from './DialogAddNotification';
import DialogDeleteNotification from './DialogDeleteNotification';

const sizeAva = 36;

interface CellActionsProps {
  item: any;
  noStatusIcon?: boolean;
}

const CellActions = (props: CellActionsProps) => {
  //! State
  const { item, noStatusIcon } = props;
  // const {
  //   open: openDialogEdit,
  //   toggle: toggleDialogEdit,
  //   shouldRender: shouldRenderDialogEdit,
  // } = useToggleDialog();
  const {
    open: openDialogDelete,
    toggle: toggleDialogDelete,
    shouldRender: shouldRenderDialogDelete,
  } = useToggleDialog();

  //! Function

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', my: 2, px: '12px' }}>
      <CommonStyles.Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 2,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        {!noStatusIcon && (
          <CommonStyles.Box
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            {/* <CommonIcons.RiEditLine
              size={SIZE_ICON_DEFAULT - 4}
              style={{ marginRight: 12, cursor: 'pointer' }}
              onClick={toggleDialogEdit}
            /> */}
            <CommonIcons.RiDeleteBin7Line
              size={SIZE_ICON_DEFAULT - 4}
              style={{ cursor: 'pointer' }}
              onClick={toggleDialogDelete}
            />
          </CommonStyles.Box>
        )}
      </CommonStyles.Box>

      {/* {shouldRenderDialogEdit && (
        <DialogAddNotification isOpen={openDialogEdit} toggle={toggleDialogEdit} item={item} />
      )} */}
      {shouldRenderDialogDelete && (
        <DialogDeleteNotification
          isOpen={openDialogDelete}
          toggle={toggleDialogDelete}
          item={item}
        />
      )}
    </CommonStyles.Box>
  );
};

export default CellActions;
