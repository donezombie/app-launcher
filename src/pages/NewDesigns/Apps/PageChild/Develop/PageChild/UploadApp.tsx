import { useQueryClient } from '@tanstack/react-query';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import SwitchField from 'components/CustomFields/SwitchField';
import { queryKeys } from 'consts';
import BaseUrl from 'consts/baseUrl';
import { AppType } from 'consts/enum';
import { Field, Form, Formik, FormikProps } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import {
  useCreateAppIntegration,
  useGetAppIntegrationDetail,
  useUpdateAppIntegration,
} from 'hooks/app/useAppHooks';
import { useDeleteAppIDCategory } from 'hooks/category/useCategoryHooks';
import { NewApp } from 'interfaces/apps';
import { isEmpty } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import AppAuthentication from '../Components/AppAuthentication';
import AppCredentials from '../Components/AppCredentials';
import AppInformation from '../Components/AppInformation';

const validateCreateApp = Yup.object().shape({
  name: Yup.string().required('Name is required field!'),
  // homepage: Yup.string().required('Homepage is required field!'),
  // summary: Yup.string().required('Summary is required field!'),
  // description: Yup.string().required('Description is required field!'),
  // icon: Yup.string().required('Icon is required field!'),
  launchUri: Yup.string().required('Launch uri is required field!'),
  appType: Yup.string()
    .required('App type is required field!')
    .test('appType', 'Invalid App type', function (value) {
      if (value && !Object.values(AppType).includes(value as AppType)) return false;
      return true;
    }),
  supportEmail: Yup.string().email('Invalid Support Email'),
  categoryId: Yup.number()
    .typeError('Category is required field!')
    .required('Category is required field!'),
});
interface Iprops {
  isEdit: boolean;
}
const UploadApp = (props: Iprops) => {
  const { isEdit = false } = props;

  //! State
  const { id } = useParams();
  const { data: resDetailApp, isLoading } = useGetAppIntegrationDetail(id || '');
  const appDetail = useMemo(() => resDetailApp?.data?.data, [isLoading]);

  const { mutateAsync: createApp } = useCreateAppIntegration();
  const { mutateAsync: updateAppIntegration } = useUpdateAppIntegration();
  // const { mutateAsync: updateAppIDCategory } = useUpdateAppIDCategory();
  const { mutateAsync: deleteAppIDCategory } = useDeleteAppIDCategory();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [dataProps, setDataProps] = useState<NewApp | undefined>(undefined);
  const [isSSO, setIsSSO] = useState(false);
  const formikRef = useRef<FormikProps<any>>(null);
  const queryClient = useQueryClient();
  // //! Function
  const initialValues = {
    appType: appDetail?.appType || '',
    loginRedirectUri: appDetail?.loginRedirectUri || '',
    logoutRedirectUri: appDetail?.logoutRedirectUri || '',
    // scopes: resDetailApp?.data?.scopes || '',
    name: appDetail?.name || '',
    icon: appDetail?.icon || '',
    supportEmail: appDetail?.supportEmail || '',
    phone: appDetail?.phone || '',
    homepage: appDetail?.homepage || '',
    launchUri: appDetail?.launchUri || '',
    termsConditionsUri: appDetail?.termsConditionsUri || '',
    privacyPolicyUri: appDetail?.privacyPolicyUri || '',
    summary: appDetail?.summary || '',
    description: appDetail?.description || '',
    developerName: appDetail?.developerName || '',
    categoryId: appDetail?.categoryId || null,
  };

  useEffect(() => {
    if (isEdit) {
      if (!appDetail?.loginRedirectUri || !appDetail?.logoutRedirectUri) {
        setIsSSO(false);
      } else {
        setIsSSO(true);
      }
    }
  }, [resDetailApp, isEdit]);
  //! Render

  const renderStep = useCallback(() => {
    switch (step) {
      case 0:
        return <AppAuthentication showUri={isSSO} />;
      case 1:
        return <AppInformation />;
      case 2:
        return <AppCredentials dataProps={dataProps} />;
      default:
        return <div />;
    }
  }, [step, isSSO]);

  return (
    <CommonStyles.Box
      className='component:UploadApp'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validateOnBlur
        validateOnMount
        innerRef={formikRef}
        validationSchema={validateCreateApp}
        onSubmit={(values, { setSubmitting }) => {
          (async () => {
            try {
              const res = isEdit
                ? await updateAppIntegration({ id: String(id), body: values })
                : await createApp(values);
              // await updateAppIDCategory({ id: values.scopes, appID: res?.data || id });
              // role !== PERMISSION_ENUM?.ADMIN
              //   ? await generateAppCredentials({ appId: res?.data || id })
              //   : null;
              setDataProps(res?.data?.data);
              // await updateAppIntegration({ id: res?.data || id, body: values });
              // if (resDetailApp?.data?.scopes) {
              //   await deleteAppIDCategory({
              //     id: resDetailApp.data.scopes || '',
              //     appID: id as string,
              //   });
              // }
              await queryClient.refetchQueries({
                queryKey: [queryKeys.getAppList],
              });
              await queryClient.refetchQueries({
                queryKey: [queryKeys.getAppDetail, id],
              });
              // navigate(BaseUrl.MyApps.Index);
              setSubmitting(true);
              showSuccess(isEdit ? 'Edit successfully!' : 'Create successfully!');
              setStep(step + 1);
              setSubmitting(false);
            } catch (error) {
              setSubmitting(false);
              showError(error);
            }
          })();
        }}
      >
        {({ isSubmitting, handleSubmit, errors, values, setFieldValue }) => {
          return (
            <Form>
              {step === 0 ? (
                <CommonStyles.Box sx={{ display: 'flex', gap: 3 }}>
                  <CommonStyles.Typography
                    component='p'
                    variant='captionLMedium'
                    sx={{ mb: 1.5, fontWeight: 'bold' }}
                  >
                    Use Marketplace SSO
                  </CommonStyles.Typography>
                  <Field
                    component={SwitchField}
                    name='isMarketplaceSSO'
                    checked={isSSO}
                    sx={{ transform: 'translateY(3px)' }}
                    afterOnChange={(values: any) => {
                      const checked = values.target.checked as boolean;
                      setIsSSO(checked);
                      setFieldValue('loginRedirectUri', '');
                      setFieldValue('logoutRedirectUri', '');
                    }}
                  />
                </CommonStyles.Box>
              ) : null}
              {renderStep()}
              {step === 0 ? (
                <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CommonStyles.Button
                    disabled={
                      !isEmpty(errors?.name) ||
                      (isSSO && isEmpty(values?.loginRedirectUri)) ||
                      (isSSO && isEmpty(values?.logoutRedirectUri))
                    }
                    onClick={() => setStep(step + 1)}
                  >
                    Next
                  </CommonStyles.Button>
                </CommonStyles.Box>
              ) : null}
              {step === 1 ? (
                <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <CommonStyles.Button onClick={() => setStep(step - 1)}>Back</CommonStyles.Button>
                  <CommonStyles.Button
                    loading={isSubmitting}
                    type='submit'
                    onClick={() => handleSubmit()}
                    disabled={isEmpty(values?.launchUri) || isEmpty(values?.appType)}
                    startIcon={<CommonIcons.SaveIcon />}
                  >
                    Save
                  </CommonStyles.Button>
                </CommonStyles.Box>
              ) : null}
              {step === 2 ? (
                <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <CommonStyles.Button onClick={() => setStep(step - 1)}>Back</CommonStyles.Button>
                  <CommonStyles.Button
                    onClick={() => navigate(BaseUrl.MyApps.Index)}
                    disabled={
                      isEmpty(values?.clientID) ||
                      isEmpty(values?.clientSecret) ||
                      isEmpty(values?.clientName)
                    }
                  >
                    Done
                  </CommonStyles.Button>
                </CommonStyles.Box>
              ) : null}
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default UploadApp;
