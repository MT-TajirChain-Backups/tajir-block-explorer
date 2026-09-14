import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

import config from 'configs/app';

const Tokens = dynamicPage(() => {
  if (config.features.opSuperchain.isEnabled) {
    return import('ui/optimismSuperchain/tokens/OpSuperchainTokens');
  }

  return import('ui/pages/Tokens');
});

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/tokens">
      <Tokens/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps/main';
