import DialogMui from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useQueryClient } from '@tanstack/react-query';
import CommonStyles from 'components/CommonStyles';
import UploadField from 'components/CommonStyles/UploadField';
import AutoCompleteField from 'components/CustomFields/AutoCompleteField';
import SelectField from 'components/CustomFields/SelectField';
import TextField from 'components/CustomFields/TextField';
import { queryKeys } from 'consts';
import { AppType, NewsType } from 'consts/enum';
import { FastField, Form, Formik, FormikValues } from 'formik';
import { showError, showSuccess } from 'helpers/toast';
import { useGetListApp } from 'hooks/app/useAppHooks';
import { useCreateNews, useUpdateNew } from 'hooks/news/useNewsHooks';
import { DialogI } from 'interfaces/common';
import { News } from 'interfaces/news';
import { isEmpty } from 'lodash';
import { useMemo } from 'react';
import { RequestCreateNews } from 'services/newsServices';
import userService from 'services/userService';
import * as Yup from 'yup';

interface Props extends DialogI<RequestCreateNews> {
  item?: News;
  isRecent?: boolean;
}

const validateAddNew = Yup.object().shape({
  title: Yup.string().required('Title is required field!'),
  body: Yup.string().required('Body is required field!'),
  thumbUrl: Yup.string().required('ThumbUrl is required field!'),
  type: Yup.string()
    .typeError('Category is required field!')
    .required('Category is required field!'),
});

const DialogAddNews = (props: Props) => {
  //! State
  const { isOpen, toggle, item, isRecent } = props;
  const { mutateAsync: createNew } = useCreateNews();
  const { mutateAsync: updateNew } = useUpdateNew();
  const queryClient = useQueryClient();

  const { data: resListApp, isLoading } = useGetListApp({});
  const data =
    useMemo(() => {
      return resListApp?.data?.data?.items;
    }, [resListApp]) || [];

  const setTitle = () => {
    if (isEdit) return isRecent ? 'Edit Recent Activity' : 'Edit News';
    return isRecent ? 'Add Recent Activity' : 'Add News';
  };

  const initialValues = {
    title: item ? item?.title : '',
    body: item ? item?.body : '',
    thumbUrl: item ? item?.thumbUrl : '',
    type: item ? item.type : NewsType.NEWS,
    directDetail: item ? item.directDetail : '',
    appId: item
      ? isRecent
        ? item?.SpecificNews.map((el) => {
            return {
              key: el.appId,
              label: data?.find((app) => app.id === el.appId)?.name,
              value: el.appId,
            };
          })
        : item?.appId
      : undefined,
  };

  const isEdit = !!item?.id;

  const optionTypes = Object.values(NewsType)
    .filter(
      isRecent
        ? (el) => el === NewsType.ACTIVITY
        : (el) => el === NewsType.NEWS || el === NewsType.DIRECT
    )
    .map((el) => ({
      key: el,
      label: el,
      value: el,
    }));

  const optionApps = data?.map((el) => ({
    key: el.id,
    label: el.name,
    value: el.id,
  }));

  const handleUpload = async (
    event: any,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
  ) => {
    try {
      const resUpload = await userService.upload({ file: event.target.files?.[0] });
      setFieldValue('thumbUrl', resUpload.data.data.uri);
      showSuccess('Upload success!');
    } catch (error) {
      showError(error);
    }
  };

  //! Render
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validateAddNew}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting }) => {
        (async () => {
          try {
            setSubmitting(true);
            const objBody = {
              ...values,
              appId: values.appId?.map((el: any) => el.value).join(','),
            };
            if (!isRecent) delete objBody.appId;
            isEdit ? await updateNew({ id: item?.id, body: objBody }) : await createNew(objBody);
            toggle();
            showSuccess(isEdit ? 'Edit news successfully!' : 'Add news successfully!');
            setSubmitting(false);
            queryClient.refetchQueries([queryKeys.getListNew]);
          } catch (error) {
            showError(error);
            setSubmitting(false);
          }
        })();
      }}
    >
      {({ handleSubmit, isSubmitting, setFieldValue }) => {
        return (
          <DialogMui scroll='paper' open={isOpen} onClose={toggle} fullWidth maxWidth='sm'>
            <DialogContent>
              <Form>
                <CommonStyles.Box>
                  <CommonStyles.Typography variant='h5' sx={{ mb: 3 }}>
                    {setTitle()}
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

                    <FastField component={TextField} name='body' label='Body ' required fullWidth />
                    <UploadField
                      name='thumbUrl'
                      placeholder='Upload your new thumbnail...'
                      label='Thumbnail'
                      helperText='Helper text'
                      fullWidth
                      required
                      onChange={(e) => handleUpload(e, setFieldValue)}
                    />
                    <CommonStyles.Typography
                      component='p'
                      variant='captionLMedium'
                      sx={{ mb: 1.5, mt: 1 }}
                    >
                      Category <span style={{ color: 'red' }}>*</span>
                    </CommonStyles.Typography>
                    <FastField
                      component={SelectField}
                      name='type'
                      options={optionTypes || []}
                      fullWidth
                      sx={{ height: '42px' }}
                    />
                    {isRecent && (
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
                          optionsArg={optionApps || []}
                          fullWidth
                          multiple
                          sx={{ height: '42px' }}
                          loadOptions={(text: string, setOptions: any, setLoading: any) => {
                            setLoading(true);
                            setOptions(optionApps);
                            setLoading(false);
                          }}
                        />
                      </>
                    )}
                    <FastField
                      component={TextField}
                      name='directDetail'
                      label='Direct Detail'
                      fullWidth
                    />
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

export default DialogAddNews;
