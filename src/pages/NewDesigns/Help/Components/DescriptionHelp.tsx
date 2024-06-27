import CommonStyles from 'components/CommonStyles';
import { useGetHelpDetail } from 'hooks/staticPage/useStaticPageHook';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

const DescriptionHelp = () => {
  const { id } = useParams();
  const { data: resDetailHelp, isLoading, refetch } = useGetHelpDetail(id || '');
  const helpDetail = useMemo(() => resDetailHelp?.data?.data, [isLoading]);

  if (isLoading) {
    return <CommonStyles.Loading />;
  }

  return <div>{helpDetail?.description}</div>;
};

export default DescriptionHelp;
