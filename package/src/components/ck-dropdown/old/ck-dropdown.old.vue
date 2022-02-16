<template lang="pug">
VDropdown(:distance="6")
  //- This will be the popover reference (for the events and position)
  button Click me

  //- This will be the content of the popover
  template(#popper)
    input.tooltip-content(
    v-model="msg"
    placeholder="Tooltip content"
    )
    //- msg
    p {{ msg }}
</template>

<script lang="ts">
import { ref } from 'vue';
import { VDropdown } from 'floating-vue';

const msg = ref('');
</script>
