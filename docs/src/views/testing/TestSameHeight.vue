<script setup lang="ts">
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
</script>

<template lang="pug">
.same-height-container
  ComponentShower(title="Group break")
    ComponentShowerRow(noGap)
      ck-button(label="Group break | Button" group="left" line-break="s")
        | Button
      ck-select(label="Group break | Select" group="center" line-break="s")
      ck-input(label="Group break | Input" group="right" line-break="s")
    ComponentShowerRow(noGap)
      ck-input(label="Group break S 1" group="left" line-break="s")
      ck-input(label="Group break S 2" group="center" line-break="s")
      ck-input(label="Group break S 3" group="right" line-break="s")
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

.same-height-container
  display flex
  align-items flex-end
  flex-wrap wrap
  .same-height__row
    display flex
    align-items flex-end
</style>
