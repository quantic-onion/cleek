<template lang="pug">
ck-input-text.mb-2(label="Default")
.mb-2
  p Example with label - {{ labelText }}
  ck-input-text(label="Example text" v-model="labelText")
.mb-2
  p Example with placeholder - {{ placeholderLabelText }}
  ck-input-text(placeholder="Write something here" v-model="placeholderLabelText")
.mb-2
  p Example without label - {{ noLabelText }}
  ck-input-text(v-model="noLabelText")
.mb-2
  p Example with required - {{ requiredText }}
  ck-input-text(label="I am required" v-model="requiredText" required)
.mb-2
  p Disabled
  ck-input-text(label="Oh :(" disabled)
.mb-2
  p Disabled with a label
  ck-input-text(label="Oh :(" modelValue="Hello" disabled)
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
      placeholderLabelText: '',
      noLabelText: '',
      requiredText: '',
    }; // return data
  }, // data
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../src/styles/tailwind-fake'
</style>
