export function setBodyOverflow(visible: boolean) {
  const overflow = visible ? 'visible' : 'hidden';
  document.body.style.overflow = overflow;
}
