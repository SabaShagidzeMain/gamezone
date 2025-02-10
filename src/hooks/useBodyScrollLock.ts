export const useBodyScrollLock = (): [() => void, () => void] => {
  const lockScroll = (): void => {
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
  };

  const unlockScroll = (): void => {
    document.body.style.overflow = "";
    document.body.style.touchAction = "";
  };

  return [lockScroll, unlockScroll];
};
