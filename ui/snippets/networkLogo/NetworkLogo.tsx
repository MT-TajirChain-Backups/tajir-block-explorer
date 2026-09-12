import { chakra } from '@chakra-ui/react';
import React from 'react';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { useColorModeValue } from 'toolkit/chakra/color-mode';
import { Image, type ImageProps } from 'toolkit/chakra/image';
import IconSvg from 'ui/shared/IconSvg';

import { INVERT_FILTER } from './consts';

const LogoFallback = ({ height = '30px' }: { height?: ImageProps['h'] }) => {
  return (
    <IconSvg
      name="networks/logo-placeholder"
      width={{ base: '100px', lg: '120px' }}
      height={ height }
      color={{ base: 'blue.600', _dark: 'white' }}
      aria-label="Network logo placeholder"
    />
  );
};

type Props = {
  className?: string;
  logoHeight?: ImageProps['h'];
};

const NetworkLogo = ({ className, logoHeight = '30px' }: Props) => {

  const logoSrc = useColorModeValue(config.UI.navigation.logo.default, config.UI.navigation.logo.dark || config.UI.navigation.logo.default);

  return (
    <chakra.a
      className={ className }
      href={ route({ pathname: '/' }) }
      aria-label="Link to main page"
    >
      <Image
        h={ logoHeight }
        maxW={{ base: '140px', lg: 'unset' }}
        skeletonWidth={{ base: '100px', lg: '120px' }}
        src={ logoSrc }
        alt={ `${ config.chain.name } network logo` }
        fallback={ <LogoFallback height={ logoHeight }/> }
        filter={{ _dark: !config.UI.navigation.logo.dark ? INVERT_FILTER : undefined }}
        objectFit="contain"
        objectPosition="left"
      />
    </chakra.a>
  );
};

export default React.memo(chakra(NetworkLogo));
