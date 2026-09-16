import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const CustomAbi = dynamicPage(() => import('ui/pages/CustomAbi'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/account/custom-abi">
      <CustomAbi/>
    </PageNextJs>
  );
};

export default Page;

export { account as getServerSideProps } from 'nextjs/getServerSideProps/main';
