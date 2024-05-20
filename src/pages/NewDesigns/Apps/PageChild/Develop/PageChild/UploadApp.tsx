import { useTheme } from '@mui/material';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { Form, Formik, FormikProps } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import {
  useCreateAppIntegration,
  useGenerateAppCredentials,
  useUpdateAppIntegration,
} from 'hooks/app/useAppHooks';
import { useCallback, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppAuthentication from '../Components/AppAuthentication';
import AppInformation from '../Components/AppInformation';
import * as Yup from 'yup';
import BaseUrl from 'consts/baseUrl';
import { isEmpty } from 'lodash';

const initialValues = {
  appType: 0,
  loginRedirectUri: '',
  logoutRedirectUri: '',
  scopes: '',
  name: '',
  icon: '',
  supportEmail: '',
  phone: '',
  homepage: '',
  launchUri: '',
  termsConditionsUri: '',
  privacyPolicyUri: '',
  summary: '',
  description: '',
  developerName: '',
  isApproved: false,
  isLive: true,
};

const validateCreateApp = Yup.object().shape({
  name: Yup.string().required('Name is required field!'),
  loginRedirectUri: Yup.string().required('Client ID is required field!'),
  logoutRedirectUri: Yup.string().required('Client Secret is required field!'),
  homepage: Yup.string().required('Homepage is required field!'),
  summary: Yup.string().required('Summary is required field!'),
  // description: Yup.string().required('Description is required field!'),
  icon: Yup.string().required('Icon is required field!'),
});

const UploadApp = () => {
  //! State
  const { mutateAsync: createApp } = useCreateAppIntegration();
  const { mutateAsync: updateAppIntegration } = useUpdateAppIntegration();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const formikRef = useRef<FormikProps<any>>(null);
  const { mutateAsync: generateAppCredentials, isLoading: isGenerating } =
    useGenerateAppCredentials();
  // //! Function

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
              const res = await createApp(values);
              await generateAppCredentials({ appId: res?.data || '' });
              await updateAppIntegration({ id: res?.data || '', body: values });
              console.log('updateAppIntegration', updateAppIntegration);

              navigate(BaseUrl.MyApps.Index);
              setSubmitting(true);
              showSuccess('Create successfully!');
              setSubmitting(false);
            } catch (error) {
              setSubmitting(false);
              showError(error);
            }
          })();
        }}
      >
        {({ isSubmitting, handleSubmit, errors }) => {
          console.log('errors', errors);
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
