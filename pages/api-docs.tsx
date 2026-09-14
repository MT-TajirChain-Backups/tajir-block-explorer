import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const ApiDocs = dynamicPage(() => import('ui/pages/ApiDocs'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/api-docs">
      <ApiDocs/>
    </PageNextJs>
  );
};

export default Page;

export { apiDocs as getServerSideProps } from 'nextjs/getServerSideProps/main';
