<script setup lang="ts">
// components
import ComponentShower from '@/components/ComponentShower.vue';
import ComponentShowerRow from '@/components/ComponentShowerRow.vue';
import PropsAndEmitsShower from '@/components/PropsAndEmitsShower.vue';
// data
import { propsAndEmits } from '@/props-and-emits';

const imgSrc = 'https://img.freepik.com/free-vector/nature-scene-with-river-hills-forest-mountain-landscape-flat-cartoon-style-illustration_1150-37326.jpg?w=2000';
const imgSrc2 = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/a4/9b/77/legacy-hotel-at-img-academy.jpg?w=1200&h=-1&s=1';
const imgSrcSquare = 'https://static.vecteezy.com/system/resources/previews/000/246/312/non_2x/mountain-lake-sunset-landscape-first-person-view-vector.jpg';
const imgSrcSquare2 = 'https://img.freepik.com/free-vector/landscape-desert-background_23-2148267138.jpg?w=2000';
</script>

<template lang="pug">
ComponentShower(title="Default")
  ck-img(:src="imgSrc" size="m")
ComponentShower(title="Border radius")
  ComponentShowerRow(title="Rounded")
    ck-img(size="s" :src="imgSrcSquare" rounded)
    ck-img(size="s" :src="imgSrcSquare2" rounded)
    ck-img(size="s" :src="imgSrc" rounded)
    ck-img(size="s" :src="imgSrc2" rounded)
  ComponentShowerRow(title="Radius")
    ck-img(size="s" :src="imgSrcSquare" radius="50%")
    ck-img(size="s" :src="imgSrcSquare2" radius="10px")
    ck-img(size="s" :src="imgSrc" radius="50%")
    ck-img(size="s" :src="imgSrc2" radius="10px")
ComponentShower(title="Size")
  ComponentShowerRow(title="size: xs | s | m | l | xl")
    ck-img(size="xs" :src="imgSrcSquare")
    ck-img(size="s" :src="imgSrcSquare")
    ck-img(size="m" :src="imgSrcSquare")
    ck-img(size="l" :src="imgSrcSquare")
    ck-img(size="xl" :src="imgSrcSquare")
  ComponentShowerRow(title="Side absolute (Fixed width AND height)")
    ck-img(size-absolute="100px" :src="imgSrcSquare2")
  ComponentShowerRow(title="Fixed width or height")
    ck-img(width="150px" :src="imgSrc")
    ck-img(height="150px" :src="imgSrc")
ComponentShower(title="Border")
  ComponentShowerRow(title="has-border")
    ck-img(size="m" :src="imgSrc" has-border)
    ck-img(width="150px" :src="imgSrc" has-border)
  ComponentShowerRow(title="has-border and border-color")
    ck-img(size="m" :src="imgSrc" has-border border-color="red")
    ck-img(width="150px" :src="imgSrc" has-border border-color="red")

PropsAndEmitsShower(
:propsList="propsAndEmits.img.props"
:emitsList="propsAndEmits.img.emits"
)
</template>
