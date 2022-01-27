<template lang="pug">
div
  ck-img.mr-2.mb-2(width="150px" :src="imgSrc")
  ck-img.mr-2.mb-2(height="150px" :src="imgSrc")
ck-img.mr-2.mb-2(size="xs" :src="imgSrc")
ck-img.mr-2.mb-2(size="s" :src="imgSrc")
ck-img.mr-2.mb-2(size="m" :src="imgSrc" notCentered)
ck-img.mr-2.mb-2(size="m" :src="imgSrc")
ck-img.mr-2.mb-2(size="l" :src="imgSrc")
ck-img.mr-2.mb-2(size="xl" :src="imgSrc")
</template>

<script>
import { ckImg } from '../../../src/components/index';

export default {
  name: 'CkImgExample',
  components: {
    ckImg,
  },
  data() {
    return {
      imgSrc: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1200&h=-1&s=1',
    }; // return data
  }, // data
}; // export default
</script>

<style lang="stylus" scoped>
@import '../../../public/cleek-styles/tiny-tailwind'
</style>
