import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const BlockCountdown = dynamicPage(() => import('ui/pages/BlockCountdown'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/block/countdown/[height]" query={ props.query }>
      <BlockCountdown/>
    </PageNextJs>
  );
};

export default Page;

export { block as getServerSideProps } from 'nextjs/getServerSideProps/main';
