<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

// const props = defineProps<{
//   modelValue: boolean;
// }>();

// const emits = defineEmits<{
//   (e: 'update:modelValue', value: boolean): void;
// }>();

const route = useRoute();

const allRoutes = [
  { title: 'Button', routeName: 'button' },
  { title: 'Checkbox', routeName: 'checkbox' },
  { title: 'Chip', routeName: 'chip' },
  { title: 'Div', routeName: 'div' },
  { title: 'Dropdown', routeName: 'dropdown' },
  { title: 'Icon', routeName: 'icon' },
  { title: 'Img', routeName: 'img' },
  { title: 'Input', routeName: 'input' },
  { title: 'Label', routeName: 'label' },
  { title: 'Navbar', routeName: 'navbar' },
  { title: 'Notify', routeName: 'notify' },
  { title: 'Popup', routeName: 'popup' },
  { title: 'Radio', routeName: 'radio' },
  { title: 'Select', routeName: 'select' },
  { title: 'Sidebar', routeName: 'sidebar' },
  { title: 'Switch', routeName: 'switch' },
  { title: 'Switch Options', routeName: 'switch-options' },
  { title: 'Table', routeName: 'table' },
  { title: 'Textarea', routeName: 'textarea' },
];

// const isActive = computed({
//   get() { return props.modelValue; },
//   set(val: boolean) { emits('update:modelValue', val); },
// });
</script>

<template lang="pug">
.components-sidebar
  .components-sidebar--content
    h2.components-title Componentes
    RouterLink.route-item(
    v-for="(routeItem, index) in allRoutes"
    :key="index"
    :to="{ name: routeItem.routeName }"
    :class="{ selected: routeItem.routeName === route.name }"
    )
      | {{ routeItem.title }}
</template>

<style lang="stylus">
.components-sidebar
  position fixed
  width 250px
  background-color white  
  ck-box-shadow()
  padding-y 1rem
  height 100vh
  top 0
  left 0
  padding-top 6rem
  z-index 1
  .components-sidebar--content
    overflow-y auto
    max-height 100%
    .components-title
      font-weight bold
      color $color-primary
      font-size 1.5rem
      padding 1rem
      // border-bottom 2px dashed $color-primary
    .route-item
      display flex
      padding 1rem 2rem
      transition .2s
      &.selected
        color $color-primary
        font-weight 600
        background-color rgba($color-primary, .15)
      &:hover
        background-color rgba($color-primary, .25)
</style>