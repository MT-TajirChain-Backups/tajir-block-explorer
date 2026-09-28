import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const L1Holders = dynamicPage(() => import('ui/pages/L1Holders'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/l1-holders">
      <L1Holders/>
    </PageNextJs>
  );
};

export default Page;

export { l1Holders as getServerSideProps } from 'nextjs/getServerSideProps/main';
