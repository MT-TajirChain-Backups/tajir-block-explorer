import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const Block = dynamicPage(() => import('ui/pages/Block'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/block/[height_or_hash]" query={ props.query }>
      <Block/>
    </PageNextJs>
  );
};

export default Page;

export { block as getServerSideProps } from 'nextjs/getServerSideProps/main';
