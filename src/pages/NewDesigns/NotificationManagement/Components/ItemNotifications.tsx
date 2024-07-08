import CommonStyles from 'components/CommonStyles';
import { showSuccess } from 'helpers/toast';
import { useReadEachNoti } from 'hooks/notification/useNotificationHook';
import { styled, useTheme } from '@mui/material/styles';
import { Badge } from '@mui/material';

interface ItemNotificationsProps {
  item: any;
}
const sizeAva = 36;

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

const ItemNotifications = (props: ItemNotificationsProps) => {
  //! State
  const { item } = props;
  const theme = useTheme();
  const { mutateAsync: updateNotification } = useReadEachNoti();

  //! Function
  const handleReadNotification = async (id: string) => {
    try {
      await updateNotification({ id });
      showSuccess('Read notification success');
    } catch (error) {
      console.log('error', error);
    }
  };

  //! Render
  return (
    <CommonStyles.Box
      sx={{ display: 'flex', alignItems: 'center', my: 2, px: '12px', cursor: 'pointer' }}
      onClick={() => handleReadNotification(item.id)}
    >
      {!item.isRead ? (
        <StyledBadge
          overlap='circular'
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          variant='dot'
          color='success'
        >
          <CommonStyles.Avatar src={item?.thumbUrl} sx={{ width: sizeAva, height: sizeAva }} />
        </StyledBadge>
      ) : (
        <CommonStyles.Avatar src={item?.thumbUrl} sx={{ width: sizeAva, height: sizeAva }} />
      )}

      <CommonStyles.Box
        sx={{
          ml: 2,
          width: '100%',
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
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default ItemNotifications;
