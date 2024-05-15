import React, { useState } from 'react';
import CommonStyles from 'components/CommonStyles';
import TabsMui from '@mui/material/Tabs';
import TabMui from '@mui/material/Tab';
import { a11yProps } from 'helpers';
import { useTheme } from '@mui/material';

interface TabsProps {
  defaultTab?: number;
  tabs: { label: string; component: any }[];
  onChangeTab?: (tab: number) => void;
}

const Tabs = ({ tabs, defaultTab = 0, onChangeTab }: TabsProps) => {
  //! State
  const theme = useTheme();
  const [value, setValue] = useState(defaultTab);

  //! Function
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    onChangeTab && onChangeTab(newValue);
  };

  //! Render
  return (
    <CommonStyles.Box sx={{ width: '100%' }}>
      <TabsMui
        value={value}
        onChange={handleChange}
        sx={{ '&': { borderBottom: '1px solid', borderColor: theme.colors?.borderInputLight } }}
        aria-label='basic tabs example'
      >
        {tabs.map((tab, index) => (
          <TabMui
            sx={{ textTransform: 'none' }}
            key={tab.label}
            label={tab.label}
            {...a11yProps(index)}
          />
        ))}
      </TabsMui>
      <CommonStyles.Box sx={{ pt: 2 }}>
        {tabs.map((tab, index) => {
          if (index === value) {
            return <tab.component key={tab.label} />;
          }
          return null;
        })}
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default React.memo(Tabs);
