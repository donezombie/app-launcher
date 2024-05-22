import React from 'react';
import { useParams } from 'react-router-dom';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import HeadWithSearching from 'components/HeadWithSearching';
import { FastField, useFormikContext } from 'formik';
import TextField from 'components/CustomFields/TextField';
import { useTheme } from '@mui/material';
import { useGenerateAppCredentials } from 'hooks/app/useAppHooks';
import { copyToClipboard } from 'helpers';
import ButtonCopy from 'components/ButtonCopy';

interface AppCredentialsProps {
  idProps: string;
}

const AppCredentials = (props: AppCredentialsProps) => {
  const { idProps } = props;

  //! State
  const theme = useTheme();
  const { mutateAsync: generateAppCredentials, isLoading } = useGenerateAppCredentials();

  const { setFieldValue, values } = useFormikContext<any>();

  //! Function
  const onGenerate = async () => {
    const res = await generateAppCredentials({ appId: idProps });
    setFieldValue('clientID', res?.data?.appClientId);
    setFieldValue('clientSecret', res?.data?.appClientSecret);
    setFieldValue('clientName', res?.data?.appClientName);
  };
  //! Render
  return (
    <CommonStyles.Box>
      <HeadWithSearching
        title='App Authentication'
        renderLeftContent={
          <CommonStyles.Button onClick={onGenerate} variant='outlined' loading={isLoading}>
            Generate New Credentials
          </CommonStyles.Button>
        }
      />
      <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mb: 2 }}>
        <FastField
          component={TextField}
          name='clientID'
          placeholder='dwaej3r8y92yr793yf9hyfqh80'
          label='Authentication Client ID'
          fullWidth
          required
          helperText='Helper text'
          InputProps={{
            endAdornment: <ButtonCopy text={values.clientID} />,
          }}
        />

        <FastField
          component={TextField}
          name='clientSecret'
          placeholder='dwaej3r8y92yr793yf9hyfqh80'
          label='Authentication Client Secret'
          fullWidth
          required
          helperText='Helper text'
          InputProps={{
            endAdornment: <ButtonCopy text={values.clientSecret} />,
          }}
        />

        <FastField
          component={TextField}
          name='clientName'
          placeholder='dwaej3r8y92yr793yf9hyfqh80'
          label='App Client Name'
          fullWidth
          required
          helperText='Helper text'
          InputProps={{
            endAdornment: <ButtonCopy text={values.clientName} />,
          }}
        />
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default AppCredentials;
