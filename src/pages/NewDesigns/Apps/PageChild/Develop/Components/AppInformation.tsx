import { useTheme } from '@mui/material';
import CommonStyles from 'components/CommonStyles';
import SelectField from 'components/CustomFields/SelectField';
import SwitchField from 'components/CustomFields/SwitchField';
import TextField from 'components/CustomFields/TextField';
import HeadWithSearching from 'components/HeadWithSearching';
import { AppType, CategoryType } from 'consts/enum';
import { FastField, Field } from 'formik';
import { useGetCategoryList } from 'hooks/category/useGetListCategory';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { Category } from 'interfaces/category';
import { useCallback } from 'react';

const initialValues = {
  categoryType: CategoryType.DEFAULT,
};

const AppInformation = () => {
  //! State
  const theme = useTheme();
  const { filters, handleSearch } = useFiltersHandler(initialValues);
  const { data: category } = useGetCategoryList(filters);

  //! Function
  const categoryOptions = useCallback(() => {
    return category?.data?.data?.items?.map((el: Category) => {
      return {
        key: el.name,
        label: el.name,
        value: el.id,
      };
    });
  }, [category]);

  const appTypeOptions = Object.values(AppType)
    .filter((item) => item !== AppType.REPORT)
    .map((type) => ({
      key: type,
      label: type,
      value: type,
    }));

  //! Render
  return (
    <CommonStyles.Box
      className='component:AppInformation'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <HeadWithSearching title='Basic Information' />
      <CommonStyles.Box>
        <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
          <FastField component={TextField} name='homepage' label='Home page' fullWidth />
          <FastField component={TextField} name='summary' label='Summary' fullWidth />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 1 }}>
          <FastField component={TextField} name='supportEmail' label='Support Email' fullWidth />
          <FastField component={TextField} name='phone' label='Phone' fullWidth />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 1 }}>
          <FastField component={TextField} required name='launchUri' label='Launch Uri' fullWidth />
          <FastField component={TextField} name='apiDoc' label='Api Doc Uri' fullWidth />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mt: 1 }}>
          <FastField
            component={TextField}
            name='termsConditionsUri'
            label='Terms Conditions Uri'
            fullWidth
          />
          <FastField
            component={TextField}
            name='privacyPolicyUri'
            label='Privacy Policy Uri'
            fullWidth
          />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ mt: 1 }}></CommonStyles.Box>
        <CommonStyles.Box sx={{ mt: 1 }}>
          <FastField
            component={TextField}
            multiline
            name='description'
            label='Description'
            fullWidth
          />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ mt: 1 }}>
          <FastField component={TextField} name='icon' label='Icon link' fullWidth />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ mt: 1 }}>
          <CommonStyles.Typography component='p' variant='captionLMedium' sx={{ mb: 1.5 }}>
            Type <span style={{ color: 'red' }}>*</span>
          </CommonStyles.Typography>
          <FastField
            component={SelectField}
            options={appTypeOptions || []}
            name='appType'
            fullWidth
            sx={{ height: '42px' }}
          />
        </CommonStyles.Box>
        <CommonStyles.Box sx={{ mt: 1 }}>
          <CommonStyles.Typography component='p' variant='captionLMedium' sx={{ mb: 1.5 }}>
            Category <span style={{ color: 'red' }}>*</span>
          </CommonStyles.Typography>
          <Field
            name='categoryId'
            component={SelectField}
            options={categoryOptions() || []}
            fullWidth
            sx={{ height: '42px' }}
          />
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
