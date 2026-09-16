import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const ApiKeys = dynamicPage(() => import('ui/pages/ApiKeys'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/account/api-key">
      <ApiKeys/>
    </PageNextJs>
  );
};

export default Page;

export { account as getServerSideProps } from 'nextjs/getServerSideProps/main';
