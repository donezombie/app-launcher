import { DialogActions, DialogContent, Switch } from '@mui/material';
import DialogMui from '@mui/material/Dialog';
import { useQueryClient } from '@tanstack/react-query';
import CommonStyles from 'components/CommonStyles';
import UploadField from 'components/CommonStyles/UploadField';
import AutoCompleteField from 'components/CustomFields/AutoCompleteField';
import RadioField from 'components/CustomFields/RadioField';
import SelectField from 'components/CustomFields/SelectField';
import TextField from 'components/CustomFields/TextField';
import { queryKeys } from 'consts';
import { CategoryType, NotiDataType } from 'consts/enum';
import { FastField, Form, Formik } from 'formik';
import { handleUpload } from 'helpers';
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
import { useAuth } from 'providers/AuthenticationProvider';
import { useMemo } from 'react';
import { RequestCreateNotification } from 'services/notificationService';
import * as Yup from 'yup';

interface Props extends DialogI<RequestCreateNotification> {
  item?: Notification;
}

interface NotificationCreate {
  title: string;
  body: string;
  imageUrl: string;
  topicId?: string | undefined;
  type: string;
  select?: string;
  appId?: string | string[];
  userId?: string | undefined;
  subTitle: string;
  data?: string;
  token?: string;
}

const validateAddNotification = Yup.object().shape({
  title: Yup.string().required('This field is required'),
  body: Yup.string().required('This field is required'),
  subTitle: Yup.string().required('This field is required'),
});

const DialogAddNotification = (props: Props) => {
  //! State
  const { isOpen, toggle, item } = props;
  const { mutateAsync: createNotification } = useCreateNotification();
  const queryClient = useQueryClient();
  const { data: resListApp, isLoading } = useGetListApp({});
  const data = useMemo(() => resListApp?.data?.data?.items, [resListApp]) || [];
  const auth = useAuth();
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
    title: item ? item?.title : '',
    body: item ? item?.body : '',
    imageUrl: item ? item?.imageUrl : '',
    type: item ? item.type : '',
    select: optionRadioSelect[0].value,
    appId: item ? parseData?.appId : '',
    userId: item ? parseData?.userId : '',
    subTitle: item ? item?.subTitle : '',
  };

  const dataObject = {
    type: NotiDataType.DETAIL_APPLICATION,
  };

  //! Function

  //! Render
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateAddNotification}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          try {
            setSubmitting(true);
            const objBody: NotificationCreate = {
              title: values.title,
              body: values.body,
              imageUrl: values.imageUrl,
              subTitle: values.subTitle,
              type: CategoryType.DEFAULT,
              data: JSON.stringify(dataObject),
              token: auth.accessToken || 'Bearer ' + localStorage.getItem('accessToken'),
            };
            // if (isArray(values.appId) && values.select === 'topic') {
            if (values.select === 'topic') {
              // objBody.topicId = values.appId?.map((el: any) => el.value).join(',');
              objBody.topicId = values.appId?.toString();
              // } else if (isArray(values.userId) && values.select === 'user') {
            } else if (values.select === 'user') {
              // objBody.userId = values.userId?.map((el: any) => el.value).join(',');
              objBody.userId = values.userId?.toString();
            }
            await createNotification(objBody);
            toggle();
            showSuccess('Add Notification successfully!');
            setSubmitting(false);
            queryClient.refetchQueries([queryKeys.getListNotification]);
          } catch (error) {
            showError(error);
            setSubmitting(false);
          }
        })();
      }}
    >
      {({ isSubmitting, setFieldValue, values, handleSubmit }) => {
        return (
          <DialogMui scroll='paper' open={isOpen} onClose={toggle} fullWidth maxWidth='sm'>
            <DialogContent>
              <Form>
                <CommonStyles.Box>
                  <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
                    {'Add Notification'}
                  </CommonStyles.Typography>
                  <CommonStyles.Box
                    sx={{
                      '& > div': {
                        mb: 2,
                      },
                    }}
                  >
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
                      autoFocus
                      fullWidth
                    />
                    <FastField component={TextField} name='body' label='Body ' required fullWidth />
                    <UploadField
                      name='imageUrl'
                      placeholder='Upload your new thumbnail...'
                      label='Thumbnail'
                      helperText='Helper text'
                      fullWidth
                      required
                      onChange={(e) => handleUpload('imageUrl', e, setFieldValue)}
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
                          Choose App
                        </CommonStyles.Typography>
                        {/* <FastField
                          component={AutoCompleteField}
                          name='appId'
                          loading={isLoading}
                          label='Choose App'
                          optionsArg={optionApps || []}
                          fullWidth
                          multiple
                          sx={{ height: '42px' }}
                          loadOptions={(text: string, setOptions: any, setLoading: any) => {
                            setLoading(true);
                            setOptions(optionApps);
                            setLoading(false);
                          }}
                        /> */}
                        <FastField
                          component={SelectField}
                          loading={isLoading}
                          name='appId'
                          options={optionApps || []}
                          fullWidth
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
                          Choose User
                        </CommonStyles.Typography>
                        {/* <FastField
                          component={AutoCompleteField}
                          name='userId'
                          loading={isLoadingUser}
                          label='Choose User'
                          optionsArg={optionUsers || []}
                          fullWidth
                          multiple
                          sx={{ height: '42px' }}
                          loadOptions={(text: string, setOptions: any, setLoading: any) => {
                            setLoading(true);
                            setOptions(optionUsers);
                            setLoading(false);
                          }}
                        /> */}
                        <FastField
                          loading={isLoadingUser}
                          component={SelectField}
                          name='userId'
                          options={optionUsers || []}
                          fullWidth
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
        );
      }}
    </Formik>
  );
};

export default DialogAddNotification;
