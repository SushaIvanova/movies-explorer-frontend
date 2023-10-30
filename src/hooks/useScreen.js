import { useMediaQuery } from 'react-responsive';

export function useScreen() {
  const isDesktop = useMediaQuery({ minWidth: 1149 });
  const isTablet = useMediaQuery({ minWidth: 629, maxWidth: 1148 });
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 628 });
  const desktopAdd = 3;
  const tabletOrMobileAdd = 2;

  return { isDesktop, isTablet, isMobile, desktopAdd, tabletOrMobileAdd };
}

