import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const OutputRoots = dynamicPage(() => import('ui/pages/OptimisticL2OutputRoots'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/output-roots">
      <OutputRoots/>
    </PageNextJs>
  );
};

export default Page;

export { outputRoots as getServerSideProps } from 'nextjs/getServerSideProps/main';
