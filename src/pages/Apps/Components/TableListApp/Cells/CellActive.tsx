import React from 'react';
import CommonStyles from 'components/CommonStyles';
import { NewApp } from 'interfaces/apps';
import { Field, Form, Formik } from 'formik';
import SwitchField from 'components/CustomFields/SwitchField';
import { showError, showSuccess } from 'helpers/toast';
import { useSetLiveApp } from 'hooks/app/useAppHooks';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from 'consts';
import { useAuth } from 'providers/AuthenticationProvider';
import { AppStatus } from 'consts/enum';

interface CellActiveProps {
  item: NewApp;
}

const CellActive = (props: CellActiveProps) => {
  //! State
  const { item } = props;
  const isAlive = !!item?.isLive;
  const { isAppManager } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync: setLiveApp } = useSetLiveApp();

  //! Function

  //! Render
  return (
    <Formik
      initialValues={{
        isAlive: isAlive,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        (async () => {
          try {
            setSubmitting(true);
            await setLiveApp({
              appId: item?.id || '',
              isAlive: !item.isLive,
            });

            await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });

            if (!values.isAlive) {
              showSuccess(`Active [${item.name}] successfully!`);
            } else {
              showSuccess(`InActive [${item.name}] successfully!`);
            }

            if (isAppManager) {
              await queryClient.refetchQueries({ queryKey: [queryKeys.getAppInstalledList] });
            }

            setSubmitting(false);
          } catch (error) {
            resetForm();
            setSubmitting(false);
            showError(error);
          }
        })();
      }}
    >
      {({ handleSubmit, isSubmitting }) => {
        return (
          <Form>
            <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Field
                component={SwitchField}
                name='isAlive'
                afterOnChange={() => {
                  handleSubmit();
                }}
                loading={isSubmitting}
                disabled={item.status !== AppStatus.APPROVED}
              />
            </CommonStyles.Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(CellActive);
