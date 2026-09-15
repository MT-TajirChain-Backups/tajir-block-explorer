import type { GridProps, HTMLChakraProps } from '@chakra-ui/react';
import { Box, Grid, Flex, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import type { CustomLinksGroup } from 'types/footerLinks';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import useFetch from 'lib/hooks/useFetch';
import useIsMobile from 'lib/hooks/useIsMobile';
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from 'toolkit/chakra/dialog';
import { Link } from 'toolkit/chakra/link';
import {
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from 'toolkit/chakra/popover';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { copy } from 'toolkit/utils/htmlEntities';
import AdditionalInfoButton from 'ui/shared/AdditionalInfoButton';
import { CONTENT_MAX_WIDTH } from 'ui/shared/layout/utils';
import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

import FooterLinkItem from './FooterLinkItem';
import IntTxsIndexingStatus from './IntTxsIndexingStatus';

const MAX_LINKS_COLUMNS = 4;

const Footer = () => {
  const BLOCKSCOUT_LINKS = [
    {
      icon: 'social/twitter' as const,
      iconSize: '18px',
      text: 'X (ex-Twitter)',
      url: 'https://x.com/tajirchain',
    },
  ];

  const fetch = useFetch();
  const isMobile = useIsMobile();

  const { isPlaceholderData, data: linksData } = useQuery<
    unknown,
    ResourceError<unknown>,
    Array<CustomLinksGroup>
  >({
    queryKey: ['footer-links'],
    queryFn: async () =>
      fetch(config.UI.footer.links || '', undefined, {
        resource: 'footer-links',
      }),
    enabled: Boolean(config.UI.footer.links),
    staleTime: Infinity,
    placeholderData: [],
  });

  const colNum = isPlaceholderData ?
    1 :
    Math.min(linksData?.length || Infinity, MAX_LINKS_COLUMNS) + 1;

  const renderNetworkInfo = React.useCallback(
    (gridArea?: GridProps['gridArea']) => {
      return (
        <Flex
          alignItems="center"
          gridArea={gridArea}
          flexWrap="wrap"
          justifyContent="flex-start"
          columnGap={3}
          rowGap={2}
          mb={{ base: 5, lg: 8 }}
          _empty={{ display: 'none' }}
        >
          {!config.UI.indexingAlert.intTxs.isHidden && <IntTxsIndexingStatus />}
          {!config.features.opSuperchain.isEnabled && (
            <NetworkAddToWallet source="Footer" />
          )}
        </Flex>
      );
    },
    [],
  );

  const renderProjectInfo = React.useCallback(
    (gridArea?: GridProps['gridArea']) => {
      const logoColor = { base: 'blue.600', _dark: 'white' };

      return (
        <Box gridArea={gridArea}>
          <Flex columnGap={2} textStyle="xs" alignItems="center">
            <span>Powered by</span>
            <Link
              href="https://www.blockscout.com"
              external
              noIcon
              display="inline-flex"
              color={logoColor}
              _hover={{ color: logoColor }}
            >
              <img
                src="https://res.cloudinary.com/dd98ifrkd/image/upload/v1789478275/Link_SVG_fubo1q.svg"
                alt="Blockscout"
                width="80px"
              />
            </Link>
          </Flex>
          <Text mt={3} fontSize="xs" lineHeight="tall">
            TJRScan is the block explorer for Tajir Chain.
            <br />
            EVM-compatible Layer 2 built on the OP Stack · Connected to the{' '}
            <Text
              as="span"
            >
              Polygon AggLayer
            </Text>
          </Text>
          <Flex alignItems="center" columnGap={1.5} mt={3} textStyle="xs">
            <Text>
              {copy} 2026 Tajir Protocol Ltd. All rights reserved.
            </Text>

            {isMobile ? (
              <DialogRoot size="full">
                <DialogTrigger asChild>
                  <AdditionalInfoButton aria-label="About explorer" color="inherit" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>About</DialogHeader>
                  <DialogBody p={2}>
                    <Text>
                      Explorer software based on Blockscout (GPL-3.0). Source
                      available
                    </Text>
                  </DialogBody>
                </DialogContent>
              </DialogRoot>
            ) : (
              <PopoverRoot positioning={{ placement: 'top' }}>
                <PopoverTrigger>
                  <AdditionalInfoButton aria-label="About explorer" color="inherit" />
                </PopoverTrigger>
                <PopoverContent
                  w="300px"
                  borderWidth="1px"
                  borderColor="border.divider"
                  borderRadius="base"
                >
                  <PopoverBody>
                    <Text fontSize="xs">
                      Explorer software based on Blockscout (GPL-3.0). Source
                      available
                    </Text>
                  </PopoverBody>
                </PopoverContent>
              </PopoverRoot>
            )}
          </Flex>
        </Box>
      );
    },
    [isMobile],
  );

  const containerProps: HTMLChakraProps<'div'> = {
    as: 'footer',
    borderTopWidth: '1px',
    borderTopColor: 'border.divider',
    bg: { base: 'whiteAlpha.900', _dark: 'blackAlpha.900' },
  };

  const contentProps: GridProps = {
    px: {
      base: 4,
      lg: config.UI.navigation.layout === 'horizontal' ? 6 : 12,
      '2xl': 6,
    },
    py: { base: 4, lg: 8 },
    gridTemplateColumns: { base: '1fr', lg: 'minmax(auto, 620px) 1fr' },
    columnGap: { lg: '32px', xl: '100px' },
    maxW: `${CONTENT_MAX_WIDTH}px`,
    m: '0 auto',
  };

  const renderRecaptcha = (gridArea?: GridProps['gridArea']) => {
    if (!config.services.reCaptchaV2.siteKey) {
      return <Box gridArea={gridArea} />;
    }

    return (
      <Box gridArea={gridArea} textStyle="xs" mt={6}>
        <span>This site is protected by reCAPTCHA and the Google </span>
        <Link href="https://policies.google.com/privacy" external noIcon>
          Privacy Policy
        </Link>
        <span> and </span>
        <Link href="https://policies.google.com/terms" external noIcon>
          Terms of Service
        </Link>
        <span> apply.</span>
      </Box>
    );
  };

  if (config.UI.footer.links) {
    return (
      <Box {...containerProps}>
        <Grid {...contentProps}>
          <div>
            {renderNetworkInfo()}
            {renderProjectInfo()}
            {renderRecaptcha()}
          </div>

          <Grid
            gap={{
              base: 6,
              lg: colNum === MAX_LINKS_COLUMNS + 1 ? 2 : 8,
              xl: 12,
            }}
            gridTemplateColumns={{
              base: 'repeat(auto-fill, 160px)',
              lg: `repeat(${colNum}, 135px)`,
              xl: `repeat(${colNum}, 160px)`,
            }}
            justifyContent={{ lg: 'flex-end' }}
            mt={{ base: 8, lg: 0 }}
          >
            {[{ title: 'Tajir', links: BLOCKSCOUT_LINKS }, ...(linksData || [])]
              .slice(0, colNum)
              .map((linkGroup) => (
                <Box key={linkGroup.title}>
                  <Skeleton
                    fontWeight={500}
                    mb={3}
                    display="inline-block"
                    loading={isPlaceholderData}
                  >
                    {linkGroup.title}
                  </Skeleton>
                  <VStack gap={1} alignItems="start">
                    {linkGroup.links.map((link) => (
                      <FooterLinkItem
                        {...link}
                        key={link.text}
                        isLoading={isPlaceholderData}
                      />
                    ))}
                  </VStack>
                </Box>
              ))}
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box {...containerProps}>
      <Grid
        {...contentProps}
        gridTemplateAreas={{
          lg: `
          "network links-top"
          "info links-bottom"
          "recaptcha links-bottom"
        `,
        }}
      >
        {renderNetworkInfo({ lg: 'network' })}
        {renderProjectInfo({ lg: 'info' })}
        {renderRecaptcha({ lg: 'recaptcha' })}

        <Grid
          gridArea={{ lg: 'links-bottom' }}
          gap={3}
          alignContent="end"
          justifyContent={{ base: 'flex-start', lg: 'flex-end' }}
          alignSelf={{ lg: 'end' }}
          mt={{ base: 8, lg: 0 }}
        >
          {BLOCKSCOUT_LINKS.map((link) => (
            <FooterLinkItem {...link} key={link.text} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default React.memo(Footer);
