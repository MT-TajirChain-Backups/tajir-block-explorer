import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const DisputeGames = dynamicPage(() => import('ui/pages/OptimisticL2DisputeGames'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/dispute-games">
      <DisputeGames/>
    </PageNextJs>
  );
};

export default Page;

export { disputeGames as getServerSideProps } from 'nextjs/getServerSideProps/main';
