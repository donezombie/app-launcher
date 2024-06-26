import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { FieldInputProps, FormikProps } from 'formik';
import { get, isString } from 'lodash';
import { SxProps, Theme, styled } from '@mui/material/styles';
import CommonStyles from 'components/CommonStyles';
import { ReactNode, useState } from 'react';
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
    // borderColor: theme?.colors?.red,
    borderWidth: 1,
  },
  '& .MuiFormHelperText-root': {
    margin: '10px 0px 0px 0px',
    color: theme.colors?.grayText,
  },
}));

interface Props {
  field?: FieldInputProps<any>;
  form?: FormikProps<any>;
  isShowHidePassword?: boolean;
  sxContainer?: SxProps<Theme>;
  helperText?: string;
  iconStartInput?: ReactNode;
  disabled?: boolean;
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
  iconStartInput,
  disabled,
  required,
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
        <CommonStyles.Typography component='p' variant='captionLMedium' sx={{ mb: 1.5 }}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </CommonStyles.Typography>
      )}
      <CustomTextField
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        error={!!msgError}
        disabled={disabled}
        helperText={
          helperText ? (
            <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '20px 1fr', gap: 0.5 }}>
              <CommonIcons.HintIcon size={SIZE_ICON_DEFAULT - 4} />
              <CommonStyles.Typography variant='captionLRegular'>
                {helperText}
              </CommonStyles.Typography>
            </CommonStyles.Box>
          ) : (
            isString(msgError) && msgError
          )
        }
        variant='outlined'
        size='small'
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
          startAdornment: iconStartInput ? (
            <InputAdornment position='start' className='icon-start-input'>
              {iconStartInput}
            </InputAdornment>
          ) : undefined,
          ...InputProps,
        }}
        {...props}
      />
    </CommonStyles.Box>
  );
};

export default TextField;
