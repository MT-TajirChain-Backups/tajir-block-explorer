import { chakra } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import React, { useCallback } from 'react';
import { scroller } from 'react-scroll';

import type { TokenCounters, TokenInfo } from 'types/api/token';

import useIsMounted from 'lib/hooks/useIsMounted';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import type { L1TokenTabs } from 'ui/pages/L1HolderToken';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';
import AssetValue from 'ui/shared/value/AssetValue';

interface Props {
  tokenQuery: UseQueryResult<TokenInfo, Error>;
  countersQuery: UseQueryResult<TokenCounters, Error>;
  onTabChange: (tab: L1TokenTabs) => void;
}

const L1TokenDetails = ({ tokenQuery, countersQuery, onTabChange }: Props) => {
  const isMounted = useIsMounted();

  const changeTabAndScroll = useCallback((tab: L1TokenTabs) => () => {
    onTabChange(tab);
    scroller.scrollTo('token-tabs', {
      duration: 500,
      smooth: true,
    });
  }, [ onTabChange ]);

  const countersItem = useCallback((item: 'token_holders_count' | 'transfers_count') => {
    const itemValue = countersQuery.data?.[item];
    if (!itemValue) {
      return 'N/A';
    }
    if (itemValue === '0') {
      return itemValue;
    }

    const tab: L1TokenTabs = item === 'token_holders_count' ? 'holders' : 'token_transfers';

    return (
      <Link onClick={ changeTabAndScroll(tab) } loading={ countersQuery.isPlaceholderData }>
        { Number(itemValue).toLocaleString() }
      </Link>
    );
  }, [ countersQuery.data, countersQuery.isPlaceholderData, changeTabAndScroll ]);

  if (tokenQuery.isError) {
    throw Error('Resource load error', { cause: tokenQuery.error as unknown as Error });
  }

  if (!isMounted) {
    return null;
  }

  const {
    exchange_rate: exchangeRate,
    total_supply: totalSupply,
    circulating_market_cap: marketCap,
    decimals,
    symbol,
  } = tokenQuery.data || {};

  return (
    <DetailedInfo.Container>
      { exchangeRate && (
        <>
          <DetailedInfo.ItemLabel
            hint="Price per token on the exchanges"
            isLoading={ tokenQuery.isPlaceholderData }
          >
            Price
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ tokenQuery.isPlaceholderData } display="inline-block">
              <span>{ `$${ Number(exchangeRate).toLocaleString(undefined, { minimumSignificantDigits: 4 }) }` }</span>
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }

      <DetailedInfo.ItemLabel
        hint="The total amount of tokens issued"
        isLoading={ tokenQuery.isPlaceholderData }
      >
        Max total supply
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue
        alignSelf="center"
        wordBreak="break-word"
        whiteSpace="pre-wrap"
      >
        <AssetValue
          amount={ totalSupply }
          asset={ <chakra.span maxW="50%" overflow="hidden" textOverflow="ellipsis"> { symbol }</chakra.span> }
          accuracy={ 3 }
          decimals={ decimals ?? '0' }
          loading={ tokenQuery.isPlaceholderData }
          w="100%"
        />
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint="Number of accounts holding the token"
        isLoading={ tokenQuery.isPlaceholderData }
      >
        Holders
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ countersQuery.isPlaceholderData }>
          { countersItem('token_holders_count') }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint="Number of transfers for the token"
        isLoading={ tokenQuery.isPlaceholderData }
      >
        Transfers
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ countersQuery.isPlaceholderData }>
          { countersItem('transfers_count') }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint="On-chain market capitalization"
        isLoading={ tokenQuery.isPlaceholderData }
      >
        Onchain Market Cap
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ tokenQuery.isPlaceholderData } display="inline-block">
          { marketCap ? `$${ BigNumber(marketCap).toFormat() }` : '-' }
        </Skeleton>
      </DetailedInfo.ItemValue>

      <DetailedInfo.ItemLabel
        hint="Circulating supply * Price"
        isLoading={ tokenQuery.isPlaceholderData }
      >
        Circulating Supply Market Cap
      </DetailedInfo.ItemLabel>
      <DetailedInfo.ItemValue>
        <Skeleton loading={ tokenQuery.isPlaceholderData } display="inline-block">
          { marketCap ? `$${ BigNumber(marketCap).toFormat() }` : '-' }
        </Skeleton>
      </DetailedInfo.ItemValue>

      { decimals && (
        <>
          <DetailedInfo.ItemLabel
            hint="Number of digits that come after the decimal place when displaying token value"
            isLoading={ tokenQuery.isPlaceholderData }
          >
            Decimals
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Skeleton loading={ tokenQuery.isPlaceholderData } minW={ 6 }>
              { decimals }
            </Skeleton>
          </DetailedInfo.ItemValue>
        </>
      ) }
    </DetailedInfo.Container>
  );
};

export default React.memo(L1TokenDetails);
