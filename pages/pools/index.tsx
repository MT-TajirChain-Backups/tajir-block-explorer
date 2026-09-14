import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const Pools = dynamicPage(() => import('ui/pages/Pools'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/pools">
      <Pools/>
    </PageNextJs>
  );
};

export default Page;

export { pools as getServerSideProps } from 'nextjs/getServerSideProps/main';
