import HeadWithSearching from 'components/HeadWithSearching';

const DetailReport = () => {
  return (
    <div>
      <HeadWithSearching title='Detail Report' />
      <iframe
        style={{ marginTop: 6, border: '1px solid', width: '100%', height: '500px' }}
        title='Sovereign KPI Reports'
        src='https://app.powerbi.com/reportEmbed?reportId=74cc4f5c-b665-4cb6-b353-9f8d12850e55&autoAuth=true&ctid=fed389da-defe-48fa-a04c-cbb08b35d480'
        // frameborder={0}
        allowFullScreen={true}
      ></iframe>
    </div>
  );
};

export default DetailReport;
