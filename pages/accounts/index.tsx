import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

import config from 'configs/app';

const Accounts = dynamicPage(() => {
  if (config.features.opSuperchain.isEnabled) {
    return import('ui/optimismSuperchain/accounts/OpSuperchainAccounts');
  }

  return import('ui/pages/Accounts');
});

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/accounts">
      <Accounts/>
    </PageNextJs>
  );
};

export default Page;

export { accounts as getServerSideProps } from 'nextjs/getServerSideProps/main';
