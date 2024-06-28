import CommonStyles from 'components/CommonStyles';
import { NewsType } from 'consts/enum';
import { useGetNewsListHooks } from 'hooks/news/useNewsHooks';
import useFiltersHandler from 'hooks/useFiltersHandler';
import { News } from 'interfaces/news';
import ItemNews from 'pages/NewDesigns/News/Components/ItemNews';

interface NotiTabProps {}

const initialValues = {
  type: NewsType.DIRECT,
};

const NotiTab = (props: NotiTabProps) => {
  //! State
  const { filters } = useFiltersHandler(initialValues);

  //! Function
  const { data: resData, isLoading } = useGetNewsListHooks(filters);

  const data = resData?.data?.data?.items || [];

  //! Render
  return (
    <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
      {isLoading ? (
        <CommonStyles.Loading />
      ) : (
        data?.map((item: News, ind: number) => {
          return <ItemNews key={ind} item={item} isRecent noStatusIcon />;
        })
      )}
    </CommonStyles.Box>
  );
};

export default NotiTab;
