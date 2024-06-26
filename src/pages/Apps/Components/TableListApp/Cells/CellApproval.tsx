import React from 'react';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { App, NewApp } from 'interfaces/apps';
import { Field, Form, Formik } from 'formik';
import SwitchField from 'components/CustomFields/SwitchField';
import { showError, showSuccess } from 'helpers/toast';
import { useApprovalAll, useApproveApp, useSetLiveApp } from 'hooks/app/useAppHooks';
import { useQueryClient } from '@tanstack/react-query';
import { PERMISSION_ENUM, queryKeys } from 'consts';
import { useAuth } from 'providers/AuthenticationProvider';
import { AppStatus } from 'consts/enum';
import SelectField from 'components/CustomFields/SelectField';
import { SelectChangeEvent } from '@mui/material';
import httpService from 'services/httpService';

interface CellApprovalProps {
  item: NewApp;
}

const CellApproval = (props: CellApprovalProps) => {
  //! State
  const { item } = props;
  const isApproved = item?.status === AppStatus.APPROVED;

  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();
  const { mutateAsync: approveApp } = useApproveApp();
  // const { mutateAsync: approveAll } = useApprovalAll();
  //! Function

  //! Render
  if (!isAdmin) {
    return (
      <CommonStyles.Box>
        {isApproved && <CommonIcons.CheckIcon color='success' />}{' '}
        {!isApproved && <CommonIcons.CloseIcon color='error' />}
      </CommonStyles.Box>
    );
  }

  return (
    <Formik
      initialValues={{
        isApproved: isApproved,
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        (async () => {
          try {
            setSubmitting(true);
            await approveApp({
              appId: item?.id || '',
              isApprove: values.isApproved,
            });
            // await approveAll({id:item?.id,isAccess: values.isApproved});

            await queryClient.refetchQueries({ queryKey: [queryKeys.getAppList] });

            if (values.isApproved) {
              showSuccess(`Activate [${item.name}] app successfully!`);
            } else {
              showSuccess(`Deactivate [${item.name}] app successfully!`);
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
      {({ handleSubmit }) => {
        return (
          <Form>
            <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Field
                component={SwitchField}
                name='isApproved'
                disabled={isApproved}
                afterOnChange={() => {
                  handleSubmit();
                }}
              />
            </CommonStyles.Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default React.memo(CellApproval);
