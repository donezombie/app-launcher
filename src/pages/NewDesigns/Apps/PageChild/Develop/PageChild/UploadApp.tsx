import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { Form, Formik, FormikProps } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import {
  useCreateAppIntegration,
  useGenerateAppCredentials,
  useGetAppIntegrationDetail,
  useUpdateAppIntegration,
} from 'hooks/app/useAppHooks';
import { useCallback, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppAuthentication from '../Components/AppAuthentication';
import AppInformation from '../Components/AppInformation';
import * as Yup from 'yup';
import BaseUrl from 'consts/baseUrl';
import { isEmpty } from 'lodash';
import { useUpdateAppIDCategory } from 'hooks/category/useCategoryHooks';
import { PERMISSION_ENUM } from 'consts';
import { useAuth } from 'providers/AuthenticationProvider';

// const initialValues = {
//   appType: 0,
//   loginRedirectUri: '',
//   logoutRedirectUri: '',
//   scopes: '',
//   name: '',
//   icon: '',
//   supportEmail: '',
//   phone: '',
//   homepage: '',
//   launchUri: '',
//   termsConditionsUri: '',
//   privacyPolicyUri: '',
//   summary: '',
//   description: '',
//   developerName: '',
//   isApproved: false,
//   isLive: true,
// };

const validateCreateApp = Yup.object().shape({
  name: Yup.string().required('Name is required field!'),
  loginRedirectUri: Yup.string().required('Client ID is required field!'),
  logoutRedirectUri: Yup.string().required('Client Secret is required field!'),
  homepage: Yup.string().required('Homepage is required field!'),
  summary: Yup.string().required('Summary is required field!'),
  // description: Yup.string().required('Description is required field!'),
  icon: Yup.string().required('Icon is required field!'),
});
interface Iprops {
  isEdit: boolean;
}
const UploadApp = (props: Iprops) => {
  const { isEdit = false } = props;

  //! State
  const { id } = useParams();
  const { data: resDetailApp } = useGetAppIntegrationDetail(id || '');
  const { mutateAsync: createApp } = useCreateAppIntegration();
  const { mutateAsync: updateAppIntegration } = useUpdateAppIntegration();
  const { mutateAsync: updateAppIDCategory } = useUpdateAppIDCategory();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const formikRef = useRef<FormikProps<any>>(null);
  const { mutateAsync: generateAppCredentials } = useGenerateAppCredentials();
  const { user } = useAuth();
  const role = user?.roles?.[0] || PERMISSION_ENUM.USER;
  // //! Function
  const initialValues = {
    appType: 0,
    loginRedirectUri: resDetailApp?.data?.loginRedirectUri || '',
    logoutRedirectUri: resDetailApp?.data?.logoutRedirectUri || '',
    scopes: resDetailApp?.data?.scopes || '',
    name: resDetailApp?.data?.name || '',
    icon: resDetailApp?.data?.icon || '',
    supportEmail: resDetailApp?.data?.supportEmail || '',
    phone: resDetailApp?.data?.phone || '',
    homepage: resDetailApp?.data?.homepage || '',
    launchUri: resDetailApp?.data?.launchUri || '',
    termsConditionsUri: resDetailApp?.data?.termsConditionsUri || '',
    privacyPolicyUri: resDetailApp?.data?.privacyPolicyUri || '',
    summary: resDetailApp?.data?.summary || '',
    description: resDetailApp?.data?.description || '',
    developerName: resDetailApp?.data?.developerName || '',
    isApproved: resDetailApp?.data?.isApproved || false,
    isLive: resDetailApp?.data?.isLive || true,
  };

  //! Render

  const renderStep = useCallback(() => {
    switch (step) {
      case 0:
        return <AppAuthentication />;
      case 1:
        return <AppInformation />;
      default:
        return <div />;
    }
  }, [step]);

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
              const res = isEdit ? null : await createApp(values);
              await updateAppIDCategory({ id: values.scopes, appID: res?.data || id });
              role === PERMISSION_ENUM?.ADMIN
                ? null
                : await generateAppCredentials({ appId: res?.data || id });
              await updateAppIntegration({ id: res?.data || id, body: values });
              navigate(BaseUrl.MyApps.Index);
              setSubmitting(true);
              showSuccess(isEdit ? 'Edit successfully!' : 'Create successfully!');
              setSubmitting(false);
            } catch (error) {
              setSubmitting(false);
              showError(error);
            }
          })();
        }}
      >
        {({ isSubmitting, handleSubmit, errors }) => {
          return (
            <Form>
              {renderStep()}
              {step === 0 ? (
                <CommonStyles.Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <CommonStyles.Button
                    disabled={
                      !isEmpty(errors?.name) ||
                      !isEmpty(errors?.loginRedirectUri) ||
                      !isEmpty(errors?.logoutRedirectUri)
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
                    disabled={
                      !isEmpty(errors?.homepage) ||
                      !isEmpty(errors?.summary) ||
                      !isEmpty(errors?.icon)
                    }
                    startIcon={<CommonIcons.SaveIcon />}
                  >
                    Save
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
