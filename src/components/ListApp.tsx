import React from 'react';
import CommonStyles from 'components/CommonStyles';
import EachApp from './EachApp';
import { uniqueId } from 'lodash';
import { IApp } from 'interfaces/apps';
import { useTheme } from '@mui/material';

interface ListAppProps {
  isInstalled?: boolean;
  isYourApp?: boolean;
}

const ListApp = ({ isInstalled = false, isYourApp = false }: ListAppProps) => {
  //! State
  const theme = useTheme();

  const items: IApp[] = [
    {
      id: uniqueId(),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  ...`,
      image: '',
      isInstalled,
      isYourApp,
    },
    {
      id: uniqueId(),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  ...`,
      image: '',
      isInstalled,
      isYourApp,
    },
    {
      id: uniqueId(),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  ...`,
      image: '',
      isInstalled,
      isYourApp,
    },
    {
      id: uniqueId(),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  ...`,
      image: '',
      isInstalled,
      isYourApp,
    },
    {
      id: uniqueId(),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  ...`,
      image: '',
      isInstalled,
      isYourApp,
    },
  ];

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:ListApp'
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 3,
        [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr' },
      }}
    >
      {items.map((el) => {
        return <EachApp key={el.id} item={el} />;
      })}
    </CommonStyles.Box>
  );
};

export default React.memo(ListApp);
