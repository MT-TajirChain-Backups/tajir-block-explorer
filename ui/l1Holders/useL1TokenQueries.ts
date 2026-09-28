import { useQuery } from '@tanstack/react-query';

import type { TokenCounters, TokenHolders, TokenInfo } from 'types/api/token';
import type { TokenTransferResponse } from 'types/api/tokenTransfer';

import config from 'configs/app';
import {
  fetchL1Token,
  fetchL1TokenCounters,
  fetchL1TokenHolders,
  fetchL1TokenTransfers,
} from 'lib/api/l1Blockscout';
import { TOKEN_COUNTERS, TOKEN_INFO_ERC_20, TOKEN_TRANSFER_ERC_20, getTokenHoldersStub } from 'stubs/token';
import { generateListStub } from 'stubs/utils';

const l1HoldersFeature = config.features.l1Holders;

export function useL1TokenQuery(hash: string | undefined) {
  return useQuery<TokenInfo>({
    queryKey: [ 'l1-token', hash ],
    queryFn: () => fetchL1Token(hash as string),
    enabled: l1HoldersFeature.isEnabled && Boolean(hash),
    placeholderData: TOKEN_INFO_ERC_20,
  });
}

export function useL1TokenCountersQuery(hash: string | undefined, enabled = true) {
  return useQuery<TokenCounters>({
    queryKey: [ 'l1-token-counters', hash ],
    queryFn: () => fetchL1TokenCounters(hash as string),
    enabled: l1HoldersFeature.isEnabled && Boolean(hash) && enabled,
    placeholderData: TOKEN_COUNTERS,
  });
}

export function useL1TokenHoldersQuery(hash: string | undefined, enabled = true) {
  return useQuery<TokenHolders>({
    queryKey: [ 'l1-token-holders', hash ],
    queryFn: () => fetchL1TokenHolders(hash as string),
    enabled: l1HoldersFeature.isEnabled && Boolean(hash) && enabled,
    placeholderData: getTokenHoldersStub(),
  });
}

export function useL1TokenTransfersQuery(hash: string | undefined, enabled = true) {
  return useQuery<TokenTransferResponse>({
    queryKey: [ 'l1-token-transfers', hash ],
    queryFn: () => fetchL1TokenTransfers(hash as string),
    enabled: l1HoldersFeature.isEnabled && Boolean(hash) && enabled,
    placeholderData: generateListStub<'general:token_transfers'>(TOKEN_TRANSFER_ERC_20, 10, {
      next_page_params: {
        block_number: 1,
        index: 1,
        items_count: 10,
      },
    }),
  });
}
