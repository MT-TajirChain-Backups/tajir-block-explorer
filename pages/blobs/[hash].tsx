import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const Blob = dynamicPage(() => import('ui/pages/Blob'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/blobs/[hash]" query={ props.query }>
      <Blob/>
    </PageNextJs>
  );
};

export default Page;

export { dataAvailability as getServerSideProps } from 'nextjs/getServerSideProps/main';
