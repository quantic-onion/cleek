<template lang="pug">
.flex
  .w-half
    div Selected ID: {{ selectedId }}
    ck-select(
    label="¿Quién es el más lindo?"
    v-model="selectedId"
    :options="options"
    )
  .w-half
    div Selected option: {{ selectedOption }}
    ck-select(
    notReduce
    label="¿Quién es el más lindo?"
    v-model="selectedOption"
    :options="options"
    )
</template>

<script>
import { ckSelect } from '../../../src/components/index';

export default {
  name: 'CkSelectExample',
  components: {
    ckSelect,
  },
  data() {
    return {
      selectedId: 0,
      selectedOption: {},
      options: [
        { id: 1, name: 'Lisandro Dalla Costa' },
        { id: 2, name: 'Germán Hofer' },
        { id: 3, name: 'Alberto piedrabuena' },
        { id: 4, name: 'Jorge Risso' },
        { id: 5, name: 'Ernesto Laprida' },
      ],
    }; // return data
  }, // data
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../src/styles/tailwind-fake'
</style>
