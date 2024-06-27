import { useQueryClient } from '@tanstack/react-query';
import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import { queryKeys } from 'consts';
import BaseUrl from 'consts/baseUrl';
import { showError, showSuccess } from 'helpers/toast';
import { IStaticPage } from 'interfaces/staticPage';
import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import staticPageServices, { CreateStaticPage } from 'services/staticPageServices';

interface CellActionsProps {
  item: IStaticPage;
}

const CellActions = ({ item }: CellActionsProps) => {
  //! State
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  //! Functions
  const handleDeleteHelp = async () => {
    try {
      setLoading(true);
      await staticPageServices.delete(String(item.id));
      await queryClient.refetchQueries({
        queryKey: [queryKeys.listHelp],
      });
      setLoading(false);
      showSuccess('Delete success');
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };
  //! Render
  return (
    <Fragment>
      <CommonStyles.Tooltip title='Edit'>
        <Link to={BaseUrl.Help.DetailWithID(item.id)}>
          <CommonStyles.Button isIconButton>
            <CommonIcons.EditIcon />
          </CommonStyles.Button>
        </Link>
      </CommonStyles.Tooltip>
      <CommonStyles.Tooltip title='Edit'>
        <CommonStyles.Button loading={loading} isIconButton onClick={handleDeleteHelp}>
          <CommonIcons.RiDeleteBin7Line />
        </CommonStyles.Button>
      </CommonStyles.Tooltip>
    </Fragment>
  );
};

export default React.memo(CellActions);
