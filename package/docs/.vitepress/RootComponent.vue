<template>
  <slot></slot>
</template>

<script>
import { getCurrentInstance, defineComponent } from 'vue';
import FloatingVue from 'floating-vue';
// import Cleek from 'cleek';
import 'floating-vue/dist/style.css';

export default defineComponent({
  setup() {
    const app = getCurrentInstance().appContext.app.;
    app.use(FloatingVue)
    // app.use(Cleek);
  }
})
</script>
