import * as React from 'react';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { FieldInputProps, FormikProps } from 'formik';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import CommonStyles from 'components/CommonStyles';

interface SwitchFieldI {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
  label?: string;
  afterOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading?: boolean;
}

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : theme.colors?.green,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

function SwitchField(props: SwitchFieldI & SwitchProps) {
  const { field, form, label, afterOnChange, sx, loading, ...restProps } = props;
  const { name, value } = field;
  const { setFieldValue } = form;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, event.target.checked);
    afterOnChange && afterOnChange(event);
  };

  const SwitchRender = (
    <CustomSwitch
      name={name}
      checked={value}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
      sx={sx}
      {...restProps}
    />
  );

  if (loading) {
    return <CommonStyles.Loading />;
  }

  if (label) {
    return (
      <FormControlLabel
        labelPlacement='start'
        sx={{ ml: 0 }}
        control={SwitchRender}
        label={label}
      />
    );
  }

  return SwitchRender;
}

export default SwitchField;
