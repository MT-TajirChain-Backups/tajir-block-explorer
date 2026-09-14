import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const AccountsLabelSearch = dynamicPage(() => import('ui/pages/AccountsLabelSearch'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/accounts/label/[slug]">
      <AccountsLabelSearch/>
    </PageNextJs>
  );
};

export default Page;

export { accountsLabelSearch as getServerSideProps } from 'nextjs/getServerSideProps/main';
