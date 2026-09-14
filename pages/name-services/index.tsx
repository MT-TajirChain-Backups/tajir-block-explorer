import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const NameServices = dynamicPage(() => import('ui/pages/NameServices'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/name-services">
      <NameServices/>
    </PageNextJs>
  );
};

export default Page;

export { nameServices as getServerSideProps } from 'nextjs/getServerSideProps/main';
