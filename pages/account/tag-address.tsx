import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const PrivateTags = dynamicPage(() => import('ui/pages/PrivateTags'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/account/tag-address">
      <PrivateTags/>
    </PageNextJs>
  );
};

export default Page;

export { account as getServerSideProps } from 'nextjs/getServerSideProps/main';
