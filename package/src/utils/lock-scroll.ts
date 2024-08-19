export function lockScroll() {
  const scrollPosition = window.scrollY;
  window.onscroll = () => {
    window.scrollTo(0, scrollPosition);
  };
}

export function unlockScroll() {
  window.onscroll = null;
}
