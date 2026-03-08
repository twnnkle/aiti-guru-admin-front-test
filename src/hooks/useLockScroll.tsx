import { useCallback, useEffect, useRef } from "react";

interface UseLockScrollReturnI {
  lockScroll: () => void;
  unlockScroll: () => void;
}

export default function useLockScroll(): UseLockScrollReturnI {
  const scrollbarWidthRef = useRef(0);
  const scrollYRef = useRef(0);
  const isLockedRef = useRef(false);

  const calculateScrollbarWidth = useCallback(() => {
    const scrollDiv = document.createElement("div");
    scrollDiv.style.width = "100px";
    scrollDiv.style.height = "100px";
    scrollDiv.style.overflow = "scroll";
    scrollDiv.style.position = "absolute";
    scrollDiv.style.top = "-9999px";
    document.body.appendChild(scrollDiv);
    scrollbarWidthRef.current = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    return scrollbarWidthRef.current;
  }, []);

  const lockScroll = useCallback(() => {
    if (isLockedRef.current) return;

    scrollYRef.current =
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      0;

    document.documentElement.style.overflow = "hidden";

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidthRef.current}px`;

    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${scrollbarWidthRef.current}px`,
    );

    isLockedRef.current = true;
  }, []);

  const unlockScroll = useCallback(() => {
    if (!isLockedRef.current) return;

    const lockedTop = document.body.style.top;
    const restoreScrollY = lockedTop ? Math.abs(parseInt(lockedTop, 10)) : 0;

    document.documentElement.style.overflow = "";
    document.documentElement.style.removeProperty("--scrollbar-width");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    window.scrollTo(0, restoreScrollY);

    isLockedRef.current = false;
  }, []);

  useEffect(() => {
    calculateScrollbarWidth();
    window.addEventListener("resize", calculateScrollbarWidth);

    return () => {
      window.removeEventListener("resize", calculateScrollbarWidth);
      unlockScroll();
    };
  }, [calculateScrollbarWidth, unlockScroll]);

  return {
    lockScroll,
    unlockScroll,
  };
}
