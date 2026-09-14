import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const WatchList = dynamicPage(() => import('ui/pages/Watchlist'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/account/watchlist">
      <WatchList/>
    </PageNextJs>
  );
};

export default Page;

export { account as getServerSideProps } from 'nextjs/getServerSideProps/main';
