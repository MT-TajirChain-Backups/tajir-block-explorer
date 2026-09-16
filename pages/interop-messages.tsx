import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const InteropMessages = dynamicPage(() => import('ui/pages/InteropMessages'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/interop-messages">
      <InteropMessages/>
    </PageNextJs>
  );
};

export default Page;

export { interopMessages as getServerSideProps } from 'nextjs/getServerSideProps/main';
