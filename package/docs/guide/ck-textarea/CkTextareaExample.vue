<template lang="pug">
.mb-2
  p Default
  ck-textarea
.mb-2
  p Example with label - {{ labelText }}
  ck-textarea(label="Example text" v-model="labelText")
.mb-2
  p Example with placeholder - {{ placeholderLabelText }}
  ck-textarea(
  placeholder="Write something here"
  v-model="placeholderLabelText"
  )
.mb-2
  p Example without label - {{ noLabelText }}
  ck-textarea(v-model="noLabelText")
.mb-2
  p Example with required - {{ requiredText }}
  ck-textarea(label="I am required" v-model="requiredText" required)
.mb-2
  p Resize Vertical
  ck-textarea(label="Resize vertical" resize="vertical")
.mb-2
  p Resize Horizontal
  ck-textarea(label="Resize horizontal" resize="horizontal")
.mb-2
  p Resize None
  ck-textarea(label="Resize none" resize="none")
.mb-2
  p Autogrow
  ck-textarea(label="Autogrow" autogrow)
.mb-2
  p Autogrow no label
  ck-textarea(autogrow)
.mb-2
  p Disabled
  ck-textarea(label="Oh :(" disabled)
.mb-2
  p Disabled with a label
  ck-textarea(
  disabled
  label="Oh :("
  modelValue="Resize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontalResize horizontal"
  )
</template>

<script>
import { ckTextarea } from '../../../src/components/index'

export default {
  name: 'SwitchExample',
  components: {
    ckTextarea,
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
