import { ref } from 'vue';

export default function useRainbow() {
  const rainbow = ref('red');
  let colorIndex = 0;

  const colors = ['red', 'blue', 'green', 'orange', 'purple', 'yellow'];

  function changeColor() {
    colorIndex++;
    if (colorIndex >= colors.length) colorIndex = 0;
    setTimeout(() => {
      rainbow.value = colors[colorIndex];
      changeColor();
    }, 1000);
  }

  changeColor();

  return {
    rainbow,
    colors,
  };
}
