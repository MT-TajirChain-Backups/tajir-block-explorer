import React from 'react';

import type { Route } from 'nextjs-routes';
import type { Props as PageProps } from 'nextjs/getServerSideProps/handlers';
import PageMetadata from 'nextjs/PageMetadata';

import useAdblockDetect from 'lib/hooks/useAdblockDetect';
import useGetCsrfToken from 'lib/hooks/useGetCsrfToken';
import useNotifyOnNavigation from 'lib/hooks/useNotifyOnNavigation';
import * as mixpanel from 'lib/mixpanel';

interface Props<Pathname extends Route['pathname']> {
  pathname: Pathname;
  children: React.ReactNode;
  query?: PageProps<Pathname>['query'];
  apiData?: PageProps<Pathname>['apiData'];
}

// After the first client hydrate, later route changes can render page UI immediately
// so existing component skeletons appear without waiting for another mount cycle.
let isClientHydrated = false;

const PageNextJs = <Pathname extends Route['pathname']>(props: Props<Pathname>) => {
  const [ isHydrated, setIsHydrated ] = React.useState(isClientHydrated);

  React.useEffect(() => {
    isClientHydrated = true;
    setIsHydrated(true);
  }, []);

  useGetCsrfToken();
  useAdblockDetect();
  useNotifyOnNavigation();

  const isMixpanelInited = mixpanel.useInit();
  mixpanel.useLogPageView(isMixpanelInited);

  return (
    <>
      <PageMetadata pathname={ props.pathname } query={ props.query } apiData={ props.apiData }/>
      { isHydrated ? props.children : null }
    </>
  );
};

export default React.memo(PageNextJs);
