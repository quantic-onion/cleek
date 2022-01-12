<template lang="pug">
ElementsShower(title="Misma altura")
  ck-input-text(group="left" v-model="text")
  ck-button(group="center") Botón
  ck-select(group="right" v-model="selectedValue" :options="options")
</template>

<script>
export default {
  data() {
    return {
      text: '',
      selectedValue: 0,
      options: [
        { id: 1, name: 'Número uno' },
        { id: 2, name: 'Número dos' },
        { id: 3, name: 'Número tres' },
        { id: 4, name: 'Número cuatro' },
      ],
    }; // return data
  }, // data
}; // export default
</script>
