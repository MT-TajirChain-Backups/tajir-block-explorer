import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const L1HolderToken = dynamicPage(() => import('ui/pages/L1HolderToken'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/l1-holders/[hash]" query={ props.query }>
      <L1HolderToken/>
    </PageNextJs>
  );
};

export default Page;

export { l1Holders as getServerSideProps } from 'nextjs/getServerSideProps/main';
