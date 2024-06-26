import React, { Fragment, useRef, useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import { Field, useFormikContext } from 'formik';
import TextField, { TextFieldFormikProps } from 'components/CustomFields/TextField';
import { InputAdornment, useTheme } from '@mui/material';

const UploadField = (props: TextFieldFormikProps) => {
  //! State
  const theme = useTheme();
  const uploadRef = useRef<HTMLInputElement>(null);
  const { setFieldValue } = useFormikContext();

  //! Function
  const handleChange = (event: any) => {
    setFieldValue(props?.name || '', event.target.files?.[0]);
  };

  //! Render
  return (
    <Fragment>
      <input
        type='file'
        ref={uploadRef}
        name={`${props.name}-upload-input`}
        style={{ display: 'none' }}
        onChange={props.onChange ? props.onChange : handleChange}
      />

      <Field
        component={TextField}
        type='text'
        InputProps={{
          onClick: () => {
            uploadRef && uploadRef?.current?.click();
          },
          readOnly: true,
          endAdornment: (
            <InputAdornment position='end'>
              <CommonStyles.Typography
                variant='body2'
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 42,
                  color: theme.colors?.black,
                  borderLeft: '1px solid',
                  borderColor: theme.colors?.border,
                  px: 2,
                }}
              >
                Upload
              </CommonStyles.Typography>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    </Fragment>
  );
};

export default React.memo(UploadField);
