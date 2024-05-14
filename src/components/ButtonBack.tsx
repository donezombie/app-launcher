import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { SIZE_ICON_DEFAULT } from 'consts';

interface ButtonBackProps {
  href?: string;
}

const ButtonBack = ({ href }: ButtonBackProps) => {
  //! State
  const navigate = useNavigate();

  //! Function

  //! Render
  return (
    <CommonStyles.Box className='component:ButtonBack'>
      <CommonStyles.Typography
        isLink
        className='is-hover'
        sx={{ display: 'inline-flex', gap: 1 }}
        onClick={() => (href ? navigate(href) : navigate(-1))}
      >
        <CommonIcons.LeftArrowIcon size={SIZE_ICON_DEFAULT} />
        Back
      </CommonStyles.Typography>
    </CommonStyles.Box>
  );
};

export default React.memo(ButtonBack);
