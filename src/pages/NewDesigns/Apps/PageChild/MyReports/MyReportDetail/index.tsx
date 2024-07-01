import CommonStyles from 'components/CommonStyles';
import UploadReport from '../../Develop/PageChild/UploadReport';

const MyReportDetail = () => {
  //! State

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      className='component:MyAppDetail'
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <UploadReport isEdit={true} />
    </CommonStyles.Box>
  );
};

export default MyReportDetail;
