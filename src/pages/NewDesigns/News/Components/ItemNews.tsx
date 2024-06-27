import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { SIZE_ICON_DEFAULT } from 'consts';
import useToggleDialog from 'hooks/useToggleDialog';
import React from 'react';
import DialogAddNews from './DialogAddNews';
import DialogDeleteNew from './DialogDeleteNew';

interface ItemNewsProps {
  item: any;
  isRecent?: boolean;
}

const sizeAva = 36;
const ItemNews = (props: ItemNewsProps) => {
  const { item, isRecent } = props;
  //! State
  const theme = useTheme();
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
    <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', my: 2, px: '12px' }}>
      <CommonStyles.Avatar src={item?.thumbUrl} sx={{ width: sizeAva, height: sizeAva }} />
      <CommonStyles.Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          ml: 2,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <CommonStyles.Box maxWidth={300}>
          <CommonStyles.Typography sx={{ flexShrink: 1 }} variant='body2' component='h3'>
            {item.title}
          </CommonStyles.Typography>
          <CommonStyles.Typography
            variant='captionMRegular'
            sx={{ color: theme.colors?.text2 }}
            component='h2'
          >
            {item?.body}
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
        <DialogAddNews
          isOpen={openDialogEdit}
          toggle={toggleDialogEdit}
          item={item}
          isRecent={isRecent}
        />
      )}
      {shouldRenderDialogDelete && (
        <DialogDeleteNew isOpen={openDialogDelete} toggle={toggleDialogDelete} item={item} />
      )}
    </CommonStyles.Box>
  );
};

export default React.memo(ItemNews);
