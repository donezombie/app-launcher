import React from 'react';
import CommonStyles from 'components/CommonStyles';
import EachApp from './EachApp';
import { uniqueId } from 'lodash';
import { IApp } from 'interfaces/apps';

interface ListAppProps {
  isInstalled?: boolean;
}

const ListApp = ({ isInstalled = false }: ListAppProps) => {
  //! State
  const items: IApp[] = [
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
    {
      id: uniqueId('app'),
      title: 'e-Sign',
      description: `Digitise document signing with eSign's secure electronic signature solution ...`,
      image: '',
      isInstalled,
    },
  ];

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:ListApp'
      sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}
    >
      {items.map((el) => {
        return <EachApp key={el.id} item={el} />;
      })}
    </CommonStyles.Box>
  );
};

export default React.memo(ListApp);
