import { useGetAppIntegrationDetail } from 'hooks/app/useAppHooks';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const DetailApiDoc = () => {
  const { id } = useParams();
  const { data: resDetailApp, isLoading } = useGetAppIntegrationDetail(id || '');
  const appDetail = useMemo(() => resDetailApp?.data?.data, [isLoading]);

  return (
    <div>
      <iframe
        style={{
          border: '1px solid',
          width: '100%',
          height: `calc(100vh - 100px)`,
        }}
        title='API Doc'
        src={`${appDetail?.apiDoc}`}
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default DetailApiDoc;
