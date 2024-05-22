import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { copyToClipboard } from 'helpers';
import { useTheme } from '@mui/material';
import { showSuccess } from 'helpers/toast';

interface ButtonCopyProps {
  text: string;
  onClick?: () => void;
}

const ButtonCopy = (props: ButtonCopyProps) => {
  //! State
  const { text, onClick } = props;
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Button
      variant='text'
      sx={{
        color: theme.colors?.black,
        borderLeft: '1px solid',
        borderColor: theme.colors?.border,
        px: 3,
        height: 43,
        borderRadius: 0,
      }}
      onClick={() => {
        if (onClick) {
          onClick();
        } else {
          copyToClipboard(text);
          showSuccess('Copied!');
        }
      }}
    >
      <CommonStyles.Typography variant='body2'>Copy</CommonStyles.Typography>
    </CommonStyles.Button>
  );
};

export default ButtonCopy;
