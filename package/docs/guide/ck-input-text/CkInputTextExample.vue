<template lang="pug">
ck-input-text.mb-2(label="Default")
.mb-2
  ck-input-text(label="Icon placeholder" icon="user" v-model="text" placeholder="Buscar...")
  ck-input-text(label="Icon text" icon="search" v-model="textInInput")
.mb-2
  ck-input-text(label="Example text" v-model="labelText")
  ck-input-text(placeholder="Write something here" v-model="placeholderLabelText")
  ck-input-text(v-model="noLabelText" placeholder="No label")
  ck-input-text(label="I am required" v-model="requiredText" required)
  ck-input-text(label="Disabled" disabled)
</template>

<script>
import { ckInputText } from '../../../src/components/index';

export default {
  name: 'InputExample',
  components: {
    ckInputText,
  },
  data() {
    return {
      labelText: '',
      text: '',
      textInInput: 'Texto en el input',
      placeholderLabelText: '',
      noLabelText: '',
      requiredText: '',
    }; // return data
  }, // data
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
