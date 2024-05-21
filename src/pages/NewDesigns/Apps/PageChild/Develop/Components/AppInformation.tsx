import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import UploadField from 'components/CommonStyles/UploadField';
import SwitchField from 'components/CustomFields/SwitchField';
import TextField from 'components/CustomFields/TextField';
import HeadWithSearching from 'components/HeadWithSearching';
import { FastField, Field } from 'formik';

const AppInformation = () => {
  //! State
  const theme = useTheme();

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:AppInformation'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <HeadWithSearching title='Basic Information' />
      <CommonStyles.Box>
        <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          <FastField component={TextField} required name='homepage' label='Home page' fullWidth />
          <FastField component={TextField} required name='summary' label='Summary' fullWidth />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ mt: 1 }}>
          <FastField
            component={TextField}
            required
            multiline
            name='description'
            label='Description'
            fullWidth
          />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ mt: 1 }}>
          <FastField component={TextField} required name='icon' label='Icon link' fullWidth />
        </CommonStyles.Box>
      </CommonStyles.Box>
      <CommonStyles.Box sx={{ display: 'flex', gap: 2, alignItems: 'baseline' }}>
        <Field component={SwitchField} name='isApproved' sx={{ transform: 'translateY(3px)' }} />
        <CommonStyles.Box>
          <CommonStyles.Typography variant='body2' sx={{ fontWeight: 600 }}>
            Private App
          </CommonStyles.Typography>
          <CommonStyles.Typography variant='caption' sx={{ color: theme.colors?.grayText }}>
            If you wish this to be a private app for a specific organisation.
          </CommonStyles.Typography>
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default AppInformation;
