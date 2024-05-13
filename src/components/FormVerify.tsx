import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { Form, Formik } from 'formik';
import { SIZE_ICON_DEFAULT } from 'consts';
import OtpInput from 'react-otp-input';
import { useEffect } from 'react';

interface FormVerifyProps {
  onSubmit: () => void;
}

const EffectVerifyForm = ({ otp, handleSubmit }: { otp: string; handleSubmit?: () => void }) => {
  useEffect(() => {
    if (otp && otp.length === 6) {
      handleSubmit && handleSubmit();
    }
  }, [otp, handleSubmit]);

  return null;
};

const FormVerify = (props: FormVerifyProps) => {
  //! State
  const { onSubmit } = props;

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:FormVerify'
      sx={{
        maxWidth: 550,
        '& form': {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        },
      }}
    >
      <Formik
        initialValues={{
          otp: '',
        }}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue, handleSubmit, isSubmitting }) => {
          return (
            <Form>
              <EffectVerifyForm
                otp={values.otp}
                handleSubmit={isSubmitting ? undefined : handleSubmit}
              />
              <CommonStyles.Typography variant='h5'>Two-Step Verification</CommonStyles.Typography>
              <CommonStyles.Typography variant='caption'>
                Please enter the OTP (one time password) to verify your account. A code has been
                sent to your authenticator.
              </CommonStyles.Typography>

              <CommonStyles.Box sx={{ mt: 3 }}>
                <OtpInput
                  value={values.otp}
                  onChange={(otp) => setFieldValue('otp', otp)}
                  numInputs={6}
                  renderInput={(props) => <input {...props} />}
                  containerStyle={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '18px',
                  }}
                  inputStyle={{
                    border: 'none',
                    borderBottom: `1px solid #d4d8da`,
                    flexGrow: 1,
                    fontSize: 22,
                    paddingBottom: 12,
                    paddingTop: 12,
                  }}
                  shouldAutoFocus
                  onPaste={(e) => {
                    const data = e.clipboardData.getData('text');
                    setFieldValue('otp', data);
                  }}
                />
              </CommonStyles.Box>

              <CommonStyles.Button fullWidth type='submit' loading={isSubmitting}>
                Verify <CommonIcons.RightArrowIcon size={SIZE_ICON_DEFAULT} />
              </CommonStyles.Button>

              <CommonStyles.Typography isLink className='is-hover'>
                Resent code
              </CommonStyles.Typography>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

export default FormVerify;
