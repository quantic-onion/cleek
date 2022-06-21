<script setup lang="ts">
import { ref } from 'vue';
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits'

const isActiveLeft = ref(false);
const isActiveRight = ref(false);
const isActiveTitle = ref(false);
const isActiveWidth = ref(false);
const sidebarWidthValue = ref('450px');

// TODO this props needs explanation
//   headerColor?: Color;
//   headerAlign?: boolean;
//   closeBtnAlign?: 'left' | 'right';
//   notCloseBtn?: boolean;
</script>

<template lang="pug">
ComponentShower(title="Side")
  ck-button(:icon="['far', 'hand-point-left']" @click="isActiveLeft = true")
    | Left (default)
  ck-button(:icon-right="['far', 'hand-point-right']" @click="isActiveRight = true")
    | Right
ComponentShower(title="Title")
  ck-button(:icon="['far', 'hand-point-left']" icon-right="heading" @click="isActiveTitle = true")
    | Title
ComponentShower(title="Width")
  ck-button(@click="sidebarWidthValue = '450px'; isActiveWidth = true")
    | 450px (default)
  ck-button(@click="sidebarWidthValue = '300px'; isActiveWidth = true")
    | 300px
  ck-button(@click="sidebarWidthValue = '800px'; isActiveWidth = true")
    | 800px

//- sidebars
ck-sidebar(v-model="isActiveLeft")
  | Left sidebar
ck-sidebar(v-model="isActiveRight" rightSide)
  | Right sidebar
ck-sidebar(v-model="isActiveTitle" title="This is a title")
  | Sidebar content
ck-sidebar(v-model="isActiveWidth" title="Custom width" :width="sidebarWidthValue")
  | Sidebar width {{ sidebarWidthValue }}
  
PropsAndEmitsShower(
:propsList="propsAndEmits.sidebar.props"
:emitsList="propsAndEmits.sidebar.emits"
)
</template>
