import { onMounted, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';

export function useScrollListener(element: Ref<HTMLElement>, handleScroll: (event: Event) => void) {
  const manageScrollListeners = (action: 'addEventListener' | 'removeEventListener') => {
    let parent = element.value?.parentElement;
    while (parent && parent !== document.body) {
      const overflowX = window.getComputedStyle(parent).overflowX;
      const overflowY = window.getComputedStyle(parent).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll' || overflowX === 'auto' || overflowX === 'scroll') {
        parent[action]('scroll', handleScroll);
      }
      parent = parent.parentElement;
    }
    window[action]('scroll', handleScroll);
  };
  onMounted(() => manageScrollListeners('addEventListener'));
  onBeforeUnmount(() => manageScrollListeners('removeEventListener'));
}
