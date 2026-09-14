import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const VerifiedAddresses = dynamicPage(() => import('ui/pages/VerifiedAddresses'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/account/verified-addresses">
      <VerifiedAddresses/>
    </PageNextJs>
  );
};

export default Page;

export { verifiedAddresses as getServerSideProps } from 'nextjs/getServerSideProps/main';
