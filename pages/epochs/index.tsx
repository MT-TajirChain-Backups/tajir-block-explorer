import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const Epochs = dynamicPage(() => import('ui/pages/Epochs'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/epochs">
      <Epochs/>
    </PageNextJs>
  );
};

export default Page;

export { celo as getServerSideProps } from 'nextjs/getServerSideProps/main';
