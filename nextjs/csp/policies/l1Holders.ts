import type CspDev from 'csp-dev';

import config from 'configs/app';

const feature = config.features.l1Holders;

export function l1Holders(): CspDev.DirectiveDescriptor {
  if (!feature.isEnabled) {
    return {};
  }

  return {
    'connect-src': [
      feature.apiHost,
    ],
  };
}
