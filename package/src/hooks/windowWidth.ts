import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

export default function useWindowWidth() {
  const windowWidth = ref(0);

  function handleWindowResize(event: Event) {
    // @ts-ignore
    windowWidth.value = event.currentTarget.innerWidth || 0;
  }
  onMounted(() => {
    nextTick(() => {
      window.addEventListener('resize', handleWindowResize);
    });
    windowWidth.value = window.innerWidth;
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleWindowResize);
  });

  return {
    windowWidth,
  };
}