<template lang="pug">
table.ck-table
  //- header
  thead(v-if="$slots.header || columns.length")
    slot(name="header")
    ck-tr
      ck-table-title(
      v-for="col in columns"
      :key="col.title"
      :col="col"
      )
  //- body
  tbody
    slot
  //- footer
  tfoot(v-if="$slots.footer")
    slot(name="footeer")
</template>

<script>
import ckTr from './ck-tr.vue';
import ckTableTitle from './inner-components/ck-table__title.vue';

export default {
  components: {
    ckTr,
    ckTableTitle,
  },
  props: {
    columns: { type: Array, required: true, default: () => ([]) },
  },
}; // export default
</script>

<style lang="stylus" scoped>
.ck-table
  width 100%
  border-collapse collapse
  display table
</style>