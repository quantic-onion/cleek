<template lang="pug">
ElementsShower(title="Ingresar texto" subtitle="ck-input-text")
  ck-input-text(
  :label="text2 ? text2 : 'Mi propio label'"
  label-align="center"
  v-model="text2"
  ) 
  ck-input-text(
  placeholder="Soy un placeholder"
  v-model="text"
  )
  h5 Group
  ck-input-text(
  label="Group left"
  group="left"
  v-model="textGroup"
  ) 
  ck-input-text(
  label="Group center"
  group="center"
  v-model="textGroup"
  ) 
  ck-input-text(
  label="Group right"
  group="right"
  v-model="textGroup"
  ) 
</template>

<script>
export default {
  data() {
    return {
      text: '',
      text2: '',
      textGroup: '',
    }; // return data
  }, // data
}; // export default
</script>