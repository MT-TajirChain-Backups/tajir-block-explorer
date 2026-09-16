import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const RewardsDashboard = dynamicPage(() => import('ui/pages/RewardsDashboard'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/account/merits">
      <RewardsDashboard/>
    </PageNextJs>
  );
};

export default Page;

export { account as getServerSideProps } from 'nextjs/getServerSideProps/main';
