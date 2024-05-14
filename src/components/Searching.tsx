import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { InputAdornment, useTheme } from '@mui/material';
import { SIZE_ICON_DEFAULT } from 'consts';
import { Field } from 'formik';
import TextField from './CustomFields/TextField';

interface SearchingProps {
  nameField?: string;
  placeholder?: string;
}

const Searching = ({
  nameField = 'search',
  placeholder = 'Search something...',
}: SearchingProps) => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <Field
      component={TextField}
      name={nameField}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <CommonIcons.Search size={SIZE_ICON_DEFAULT} color={theme.colors?.black} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <CommonStyles.Button
              type='submit'
              variant='text'
              sx={{
                borderLeft: '1px solid',
                borderColor: theme.colors?.border,
                borderRadius: 0,
                px: 2,
                height: 41,
                color: theme.colors?.black,
              }}
              fullWidth
            >
              Search
            </CommonStyles.Button>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default React.memo(Searching);
