import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const GasTracker = dynamicPage(() => import('ui/pages/GasTracker'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/gas-tracker">
      <GasTracker/>
    </PageNextJs>
  );
};

export default Page;

export { gasTracker as getServerSideProps } from 'nextjs/getServerSideProps/main';
