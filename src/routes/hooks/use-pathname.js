import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

export function usePathnames() {
  const { pathname } = usePathname();

  return useMemo(() => pathname, [pathname]);
}
