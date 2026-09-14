import type { Loader } from 'next/dynamic';
import dynamic from 'next/dynamic';

export default function dynamicPage<P>(loader: Loader<P>) {
  // On the client, start the chunk fetch as soon as the route module loads.
  // Webpack caches import(), so the later dynamic() render reuses the same promise.
  if (typeof window !== 'undefined' && typeof loader === 'function') {
    loader();
  }

  return dynamic<P>(loader, { ssr: false });
}
