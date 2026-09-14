import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

import { MultichainProvider } from 'lib/contexts/multichain';

const AccountsLabelSearch = dynamicPage(() => import('ui/pages/AccountsLabelSearch'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/chain/[chain_slug]/accounts/label/[slug]">
      <MultichainProvider>
        <AccountsLabelSearch/>
      </MultichainProvider>
    </PageNextJs>
  );
};

export default Page;

export { accountsLabelSearch as getServerSideProps } from 'nextjs/getServerSideProps/multichain';
