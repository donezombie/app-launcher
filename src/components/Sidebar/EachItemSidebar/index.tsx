import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { SidebarItem } from 'interfaces/common';
import { SIZE_ICON_DEFAULT } from 'consts';
import { useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { isBoolean } from 'lodash';

interface EachItemSidebarProps {
  item: SidebarItem;
}

const GRID_TEMPLATE_COLUMNS = '30px 1fr';

const EachItemSidebar = ({ item }: EachItemSidebarProps) => {
  //! State
  const theme = useTheme();
  const history = useLocation();
  const { pathname } = history;

  const isActive = pathname.includes(item.path);
  const isHidden = !item.show;

  //! Function

  //! Render
  if (isHidden) {
    return <></>;
  }
  return (
    <CommonStyles.Box className='component:EachItemSidebar'>
      <Link to={item.path} className='unstyle-link'>
        <CommonStyles.Box
          sx={{
            display: 'grid',
            gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
            gap: '4px',
            padding: '6px 10px',
            alignItems: 'center',

            borderRadius: 2,
            backgroundColor: isActive ? theme?.colors?.grayActiveMenu : undefined,
          }}
          className='is-hover'
        >
          <item.icon size={SIZE_ICON_DEFAULT - 5} />

          <CommonStyles.Typography variant='body2'>{item.label}</CommonStyles.Typography>
        </CommonStyles.Box>
      </Link>

      {isActive && item.children && (
        <CommonStyles.Box className='each-sidebar__children' sx={{ my: 0.8 }}>
          {item.children.map((el) => {
            const isHiddenChildren = !el.showChildren;
            const newRegexPathName = new RegExp(pathname, 'g');
            const isActive = isBoolean(el.forceActive)
              ? el.forceActive
              : newRegexPathName.test(el.path);

            if (isHiddenChildren) {
              return <></>;
            }

            return (
              <Link key={el.path} to={el.path} className='unstyle-link'>
                <CommonStyles.Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: GRID_TEMPLATE_COLUMNS,
                    gap: '4px',
                    alignItems: 'center',
                  }}
                  className='is-hover unstyle-link'
                >
                  <CommonStyles.Box />

                  <CommonStyles.Typography
                    variant='body2'
                    sx={{
                      color: theme.colors?.grayText,
                      borderRadius: 2,
                      backgroundColor: isActive ? theme?.colors?.grayActiveMenu : undefined,
                      padding: '6px 10px',
                    }}
                  >
                    {el.label}
                  </CommonStyles.Typography>
                </CommonStyles.Box>
              </Link>
            );
          })}
        </CommonStyles.Box>
      )}
    </CommonStyles.Box>
  );
};

export default React.memo(EachItemSidebar);
