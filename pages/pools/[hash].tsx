import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const Pool = dynamicPage(() => import('ui/pages/Pool'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/pools/[hash]" query={ props.query }>
      <Pool/>
    </PageNextJs>
  );
};

export default Page;

export { pools as getServerSideProps } from 'nextjs/getServerSideProps/main';
