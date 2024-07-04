import { DialogActions, DialogContent } from '@mui/material';
import DialogMui from '@mui/material/Dialog';
import { useQueryClient } from '@tanstack/react-query';
import CommonStyles from 'components/CommonStyles';
import UploadField from 'components/CommonStyles/UploadField';
import AutoCompleteField from 'components/CustomFields/AutoCompleteField';
import RadioField from 'components/CustomFields/RadioField';
import TextField from 'components/CustomFields/TextField';
import { queryKeys } from 'consts';
import { CategoryType } from 'consts/enum';
import { FastField, Form, Formik } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import { useGetListApp } from 'hooks/app/useAppHooks';
import {
  useCreateNotification,
  useGetUserReceiveNotification,
  useUpdateNotification,
} from 'hooks/notification/useNotificationHook';
import { DialogI } from 'interfaces/common';
import { Notification } from 'interfaces/notification';
import { isArray } from 'lodash';
import { useMemo, useState } from 'react';
import { RequestCreateNotification } from 'services/notificationService';
import userService from 'services/userService';
import * as Yup from 'yup';

interface Props extends DialogI<RequestCreateNotification> {
  item?: Notification;
}

interface NotificationCreate {
  title: string;
  body: string;
  imageUrl: string;
  topicId?: string;
  type: string;
  select?: string;
  appId?: string | string[];
  userId?: string;
  subTitle: string;
  data?: string;
}

const validateAddNotification = Yup.object().shape({});

const DialogAddNotification = (props: Props) => {
  const { isOpen, toggle, item } = props;
  const { mutateAsync: createNotification } = useCreateNotification();
  const { mutateAsync: updateNotification } = useUpdateNotification();
  const queryClient = useQueryClient();
  const { data: resListApp, isLoading } = useGetListApp({});
  const data = useMemo(() => resListApp?.data?.data?.items, [resListApp]) || [];
  const optionApps = data.map((el: { id: string; name: string }) => ({
    key: el.id,
    label: el.name,
    value: el.id,
  }));
  const { data: resListUser, isLoading: isLoadingUser } = useGetUserReceiveNotification({});
  const optionUsers = resListUser?.data?.data?.map((el) => ({
    key: el.id,
    label: el.username,
    value: el.id,
  }));
  const optionRadioSelect = [
    { value: 'topic', label: 'Topic' },
    { value: 'user', label: 'User' },
  ];
  const parseData = JSON.parse(item?.data || '{}');
  const initialValues: NotificationCreate = {
    title: item?.title || '',
    body: item?.body || '',
    imageUrl: item?.imageUrl || '',
    type: item?.type || '',
    select: 'topic',
    appId: parseData?.appId || '',
    userId: parseData?.userId || '',
    subTitle: item?.subTitle || '',
  };
  const dataObject = { type: 'application' };

  const handleUpload = async (
    event: any,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  ) => {
    try {
      const resUpload = await userService.upload({ file: event.target.files?.[0] });
      setFieldValue('imageUrl', resUpload.data.data.uri);
      showSuccess('Upload success!');
    } catch (error) {
      showError(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateAddNotification}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);
          const objBody: NotificationCreate = {
            title: values.title,
            body: values.body,
            imageUrl: values.imageUrl,
            subTitle: values.subTitle,
            type: CategoryType.DEFAULT,
            data: JSON.stringify(dataObject),
          };
          if (isArray(values.appId) && values.select === 'topic') {
            objBody.topicId = values.appId.map((el: any) => el.value).join(',');
          } else if (isArray(values.userId) && values.select === 'user') {
            objBody.userId = values.userId.map((el: any) => el.value).join(',');
          }
          await createNotification(objBody);
          toggle();
          showSuccess('Add Notification successfully!');
          queryClient.refetchQueries([queryKeys.getListNotification]);
        } catch (error) {
          showError(error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, setFieldValue, values, handleSubmit }) => (
        <DialogMui scroll='paper' open={isOpen} onClose={toggle} fullWidth maxWidth='sm'>
          <DialogContent>
            <Form>
              <CommonStyles.Box>
                <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
                  Add Notification
                </CommonStyles.Typography>
                <CommonStyles.Box sx={{ '& > div': { mb: 2 } }}>
                  <FastField
                    component={TextField}
                    name='title'
                    label='Title'
                    required
                    autoFocus
                    fullWidth
                  />
                  <FastField
                    component={TextField}
                    name='subTitle'
                    label='Sub Title'
                    required
                    fullWidth
                  />
                  <FastField component={TextField} name='body' label='Body' required fullWidth />
                  <UploadField
                    name='imageUrl'
                    placeholder='Upload your new thumbnail...'
                    label='Thumbnail'
                    helperText='Helper text'
                    fullWidth
                    required
                    onChange={(e) => handleUpload(e, setFieldValue)}
                  />
                  <FastField
                    component={RadioField}
                    name='select'
                    values={optionRadioSelect}
                    fullWidth
                  />
                  {values.select === 'topic' && (
                    <>
                      <CommonStyles.Typography
                        component='p'
                        variant='captionLMedium'
                        sx={{ mb: 1.5, mt: 1 }}
                      >
                        App
                      </CommonStyles.Typography>
                      <FastField
                        component={AutoCompleteField}
                        name='appId'
                        loading={isLoading}
                        label='Choose App'
                        optionsArg={optionApps}
                        fullWidth
                        multiple
                        sx={{ height: '42px' }}
                      />
                    </>
                  )}
                  {values.select === 'user' && (
                    <>
                      <CommonStyles.Typography
                        component='p'
                        variant='captionLMedium'
                        sx={{ mb: 1.5, mt: 1 }}
                      >
                        User
                      </CommonStyles.Typography>
                      <FastField
                        component={AutoCompleteField}
                        name='userId'
                        loading={isLoadingUser}
                        label='Choose User'
                        optionsArg={optionUsers}
                        fullWidth
                        multiple
                        sx={{ height: '42px' }}
                      />
                    </>
                  )}
                </CommonStyles.Box>
              </CommonStyles.Box>
            </Form>
          </DialogContent>
          <DialogActions>
            <CommonStyles.Button variant='text' onClick={toggle}>
              Cancel
            </CommonStyles.Button>
            <CommonStyles.Button
              loading={isSubmitting}
              type='submit'
              onClick={() => handleSubmit()}
            >
              Submit
            </CommonStyles.Button>
          </DialogActions>
        </DialogMui>
      )}
    </Formik>
  );
};

export default DialogAddNotification;
