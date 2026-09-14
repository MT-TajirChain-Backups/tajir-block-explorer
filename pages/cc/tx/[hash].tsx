import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const ZetaChainCCTX = dynamicPage(() => import('ui/pages/ZetaChainCCTX'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/cc/tx/[hash]" query={ props.query }>
      <ZetaChainCCTX/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps/main';
