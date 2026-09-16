import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const TacOperations = dynamicPage(() => import('ui/pages/TacOperations'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/operations">
      <TacOperations/>
    </PageNextJs>
  );
};

export default Page;

export { tac as getServerSideProps } from 'nextjs/getServerSideProps/main';
