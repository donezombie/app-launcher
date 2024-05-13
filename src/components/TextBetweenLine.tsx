import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { useTheme } from '@mui/material';

interface TextBetweenLineProps {
  text: string;
}

const TextBetweenLine = (props: TextBetweenLineProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Typography
      component='span'
      sx={{
        fontSize: '0.825rem',
        display: 'flex',
        color: theme.colors?.grayText,
        flexDirection: 'row',
        '&:before, &:after': {
          content: "''",
          flex: '1 1',
          borderBottom: `1px solid ${theme.colors?.borderInputLight}`,
          margin: 'auto',
        },

        '&:before': {
          marginRight: 2,
        },
        '&:after': {
          marginLeft: 2,
        },
      }}
    >
      {props.text}
    </CommonStyles.Typography>
  );
};

export default React.memo(TextBetweenLine);
