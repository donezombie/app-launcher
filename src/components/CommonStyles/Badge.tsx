import { PropsWithChildren } from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';

interface BadgeProps {}

const Badge = (props: PropsWithChildren<BadgeProps>) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:Badge'
      sx={{ padding: '2px 4px', backgroundColor: theme?.colors?.gray2, borderRadius: 0.5 }}
    >
      <CommonStyles.Typography sx={{ color: theme.colors?.text2 }} variant='captionMedium'>
        {props.children}
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default Badge;
