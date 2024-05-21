import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import SelectField from 'components/CustomFields/SelectField';
import SwitchField from 'components/CustomFields/SwitchField';
import TextField from 'components/CustomFields/TextField';
import HeadWithSearching from 'components/HeadWithSearching';
import { FastField, Field } from 'formik';
import { useGetListCategory } from 'hooks/category/useGetListCategory';
import { ICategory } from 'interfaces/category';
import { useCallback } from 'react';

const AppInformation = () => {
  //! State
  const theme = useTheme();
  const { category } = useGetListCategory();
  //! Function
  const categoryOptions = useCallback(() => {
    return category.map((el: ICategory) => {
      return {
        label: el.name,
        value: el.id,
      };
    });
  }, [category]);

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
        <FastField
          component={TextField}
          required
          multiline
          name='description'
          label='Description'
          fullWidth
        />
        <FastField component={TextField} required name='icon' label='Icon link' fullWidth />
      </CommonStyles.Box>

      <CommonStyles.Box>
        <CommonStyles.Typography component='p' variant='captionLMedium' sx={{ mb: 1.5 }}>
          Category
        </CommonStyles.Typography>
        <Field
          name='scopes'
          component={SelectField}
          options={categoryOptions()}
          fullWidth
          required
          sx={{ height: '42px' }}
        />
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
