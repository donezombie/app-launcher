import CommonIcons from 'components/CommonIcons';
import CommonStyles from 'components/CommonStyles';
import BaseUrl from 'consts/baseUrl';
import { NewApp } from 'interfaces/apps';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CellActions = ({ item }: { item: NewApp }) => {
  const navigate = useNavigate();

  return (
    <CommonStyles.Box
      sx={{ cursor: 'pointer' }}
      onClick={() => navigate(BaseUrl.Report.DetailReportWithId(item.id))}
    >
      <CommonIcons.HintIcon size={20} />
    </CommonStyles.Box>
  );
};

export default CellActions;
