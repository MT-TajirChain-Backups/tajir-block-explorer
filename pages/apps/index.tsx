import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const Marketplace = dynamicPage(() => import('ui/pages/Marketplace'));

const Page: NextPage = () => (
  <PageNextJs pathname="/apps">
    <Marketplace/>
  </PageNextJs>
);

export default Page;

export { marketplace as getServerSideProps } from 'nextjs/getServerSideProps/main';
