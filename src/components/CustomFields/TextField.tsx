import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { FieldInputProps, FormikProps } from 'formik';
import { get, isString } from 'lodash';
import { SxProps, Theme, styled } from '@mui/material/styles';
import CommonStyles from 'components/CommonStyles';
import { useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import { SIZE_ICON_DEFAULT } from 'consts';

const CustomTextField = styled(MuiTextField)(({ theme }) => ({
  '& input:valid + fieldset': {
    borderColor: theme.colors?.borderInput,
    borderWidth: 1,
  },
  '& input': {
    backgroundColor: theme.colors?.white,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: '0.825rem',
  },
  '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiInputBase-adornedEnd': {
    paddingRight: 0,
  },
  '& input:invalid + fieldset': {
    borderColor: theme?.colors?.red,
    borderWidth: 1,
  },
  '& .MuiFormHelperText-root': {
    margin: '8px 0px 0px 0px',
    color: theme.colors?.grayText,
  },
}));

interface Props {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  isShowHidePassword?: boolean;
  sxContainer?: SxProps<Theme>;
  helperText?: string;
}

export type TextFieldFormikProps = Props & TextFieldProps;

const TextField = ({
  field,
  form,
  label,
  isShowHidePassword,
  InputProps,
  type,
  sxContainer,
  helperText,
  ...props
}: Props & TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { name, value, onBlur, onChange } = field || {};
  const { errors, touched } = form || {};

  const msgError =
    get(touched, name || '') && get(errors, name || '') ? get(errors, name || '') : '';

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <CommonStyles.Box sx={sxContainer}>
      {label && (
        <CommonStyles.Typography component='p' variant='captionMedium' sx={{ mb: 1.5 }}>
          {label}
        </CommonStyles.Typography>
      )}
      <CustomTextField
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        error={!!msgError}
        helperText={
          helperText ? (
            <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 0.5 }}>
              <CommonIcons.HintIcon size={SIZE_ICON_DEFAULT - 4} />
              <CommonStyles.Typography variant='caption'>{helperText}</CommonStyles.Typography>
            </CommonStyles.Box>
          ) : (
            isString(msgError) && msgError
          )
        }
        variant='outlined'
        size='small'
        sx={{
          '& label': {},
          '& input': {},
        }}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        InputProps={{
          endAdornment: isShowHidePassword ? (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <CommonIcons.EyeCloseIcon /> : <CommonIcons.EyeOpenIcon />}
              </IconButton>
            </InputAdornment>
          ) : null,
          ...InputProps,
        }}
        {...props}
      />
    </CommonStyles.Box>
  );
};

export default TextField;
