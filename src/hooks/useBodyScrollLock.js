import { useEffect } from "react";

export const useBodyScrollLock = () => {
  const lockScroll = () => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  };

  return [lockScroll, unlockScroll];
};
