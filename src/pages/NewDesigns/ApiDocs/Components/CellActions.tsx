import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import BaseUrl from 'consts/baseUrl';
import { NewApp } from 'interfaces/apps';
import { useAuth } from 'providers/AuthenticationProvider';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CellActions = ({ item }: { item: NewApp }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <CommonStyles.Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CommonStyles.Tooltip title='Edit'>
        <Link to={BaseUrl.MyApps.DetailWithID(item.id)}>
          <CommonStyles.Button isIconButton disabled={item?.ownerUserId !== user?.id}>
            <CommonIcons.EditIcon />
          </CommonStyles.Button>
        </Link>
      </CommonStyles.Tooltip>
      <CommonStyles.Tooltip title='Info'>
        <CommonStyles.Box onClick={() => navigate(BaseUrl.ApiDocs.DetailReportWithId(item.id))}>
          <CommonStyles.Button isIconButton disabled={!item.apiDoc}>
            <CommonIcons.Info />
          </CommonStyles.Button>
        </CommonStyles.Box>
      </CommonStyles.Tooltip>
    </CommonStyles.Box>
  );
};

export default CellActions;
