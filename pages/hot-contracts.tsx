import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const HotContracts = dynamicPage(() => import('ui/pages/HotContracts'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/hot-contracts">
      <HotContracts/>
    </PageNextJs>
  );
};

export default Page;

export { hotContracts as getServerSideProps } from 'nextjs/getServerSideProps/main';
