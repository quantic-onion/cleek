<template lang="pug">
ElementsShower(title="Área de texto" subtitle="ck-textarea")
  ck-textarea(label="Area de texto con loren ipsum" v-model="textareaText")
</template>

<script>
export default {
  data() {
    return {
      textareaText:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    }; // return data
  }, // data
}; // export default
</script>
