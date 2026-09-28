import { chakra } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import { Image } from 'toolkit/chakra/image';
import { Link } from 'toolkit/chakra/link';
import { stripTrailingSlash } from 'toolkit/utils/url';
import IconSvg from 'ui/shared/IconSvg';
import VerifyWith from 'ui/shared/VerifyWith';

interface Props {
  className?: string;
  tokenHash: string;
}

const l1HoldersFeature = config.features.l1Holders;

const L1ExternalExplorers = ({ className, tokenHash }: Props) => {
  const explorersLinks = React.useMemo(() => {
    if (!l1HoldersFeature.isEnabled) {
      return [];
    }

    return l1HoldersFeature.externalExplorers
      .filter((explorer) => typeof explorer.paths.token === 'string')
      .map((explorer) => {
        const path = explorer.paths.token || '';
        const pathWithParam = path.includes(':id') ?
          path.replace(':id', tokenHash) :
          `${ stripTrailingSlash(path) }/${ tokenHash }`;
        const url = new URL(pathWithParam, explorer.baseUrl);

        return (
          <Link external h="34px" key={ explorer.baseUrl } href={ url.toString() } alignItems="center" display="inline-flex" minW="120px">
            { explorer.logo ?
              <Image boxSize={ 5 } mr={ 2 } src={ explorer.logo } alt={ `${ explorer.title } icon` }/> :
              <IconSvg name="explorer" boxSize={ 5 } color="icon.primary" mr={ 2 }/>
            }
            { explorer.title }
          </Link>
        );
      });
  }, [ tokenHash ]);

  if (explorersLinks.length === 0) {
    return null;
  }

  return (
    <VerifyWith
      className={ className }
      links={ explorersLinks }
      label="Verify with other explorers"
      longText={ `${ explorersLinks.length } Explorer${ explorersLinks.length > 1 ? 's' : '' }` }
      shortText={ explorersLinks.length.toString() }
    />
  );
};

export default React.memo(chakra(L1ExternalExplorers));
