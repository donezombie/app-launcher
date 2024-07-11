import { useQueryClient } from '@tanstack/react-query';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import SwitchField from 'components/CustomFields/SwitchField';
import { queryKeys } from 'consts';
import { AppStatus } from 'consts/enum';
import { Field, Form, Formik } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import { useApproveApp } from 'hooks/app/useAppHooks';
import { NewApp } from 'interfaces/apps';
import { useAuth } from 'providers/AuthenticationProvider';
import React from 'react';

interface CellApprovalProps {
  item: NewApp;
}

const CellApproval = (props: CellApprovalProps) => {
  //! State
  const { item } = props;

  const isApproved = item?.status === AppStatus.APPROVED;
  console.log(isApproved, 'item');

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
      enableReinitialize
      onSubmit={(values, { setSubmitting, resetForm }) => {
        (async () => {
          try {
            setSubmitting(true);
            await approveApp({
              appId: item?.id || '',
              isApprove: values.isApproved,
            });

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
                disabled={item?.status === AppStatus.DELETED || isApproved}
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
