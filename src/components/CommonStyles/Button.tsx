import MuiIconButton, { IconButtonProps } from '@mui/material/IconButton';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import CommonStyles from '.';

type TypeButton = IconButtonProps & LoadingButtonProps;
interface Props extends TypeButton {
  isIconButton?: boolean;
  component?: string;
}

const Button = ({ isIconButton, sx, ...props }: Props) => {
  if (isIconButton) {
    return (
      <MuiIconButton sx={sx} {...props}>
        {props?.loading ? <CommonStyles.Loading /> : props.children}
      </MuiIconButton>
    );
  }

  return (
    <LoadingButton
      variant='contained'
      sx={{
        textTransform: 'initial',
        py: 0.8,
        gap: 1.25,
        boxShadow: 0,
        ...sx,
      }}
      {...props}
    >
      {props.children}
    </LoadingButton>
  );
};

export default Button;
