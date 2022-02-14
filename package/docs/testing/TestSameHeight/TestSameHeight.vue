<template lang="pug">
.same-height-container
  .same-height__row
    //- button
    ck-button.mt-2(group="left")
      | Button
    //- select
    ck-select.mt-2(
    group="center"
    label="Select"
    :options="[{ id: 1, name: 'A'}, { id: 2, name: 'B'}, { id: 3, name: 'C'}]"
    )
    //- input
    ck-input.mt-2(label="Input text" group="right")
  .same-height__row
    //- input
    ck-input.mt-2(label="Input text 2" group="left")
    //- switch-options
    ck-switch-options.mt-2(
    label="Switch options"
    group="right"
    :options="[{name: 'Option A'}, {name: 'Option B'}]"
    )
  .same-height__row
    //- switch
    ck-switch.mt-2
    //- button
    ck-button.mt-2(icon="user" icon-right="times")
      | Icons
  .same-height__row
    //- switch-options
    ck-switch-options.mt-2(
    label="Switch options"
    group="left"
    :options="[{name: 'Option A'}, {name: 'Option B'}]"
    )
    //- switch-options
    ck-switch-options(
    group="right"
    :options="[{name: 'Option A'}, {name: 'Option B'}]"
    )
    div
      //- switch-options
      ck-switch-options.mt-2(
      label="Switch options"
      group-vertical="top"
      :options="[{name: 'Option A'}, {name: 'Option B'}]"
      )
      //- switch-options
      ck-switch-options(
      group-vertical="bottom"
      :options="[{name: 'Option A'}, {name: 'Option B'}]"
      )
</template>

<script setup lang="ts">
import * as cleek from '../../../src/components/index';
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'

.same-height-container
  display flex
  align-items flex-end
  flex-wrap wrap
  .same-height__row
    display flex
    align-items flex-end
</style>
