<template lang="pug">
ElementsShower(title="Botones" subtitle="ck-button")
  h5 Color
  ck-button.mr-2.mb-2(color="primary")
    | primary
  ck-button.mr-2.mb-2(color="secondary")
    | secondary
  ck-button.mr-2.mb-2(color="success")
    | success
  ck-button.mr-2.mb-2(color="warning")
    | warning
  ck-button.mr-2.mb-2(color="danger")
    | danger
  ck-button.mr-2.mb-2(color="light")
    | light
  ck-button.mr-2.mb-2(color="dark")
    | dark
  h5 Type
  ck-button.mr-2.mb-2(color="primary")
    | primary
  ck-button.mr-2.mb-2(color="secondary" type="filled")
    | secondary filled
  ck-button.mr-2.mb-2(color="success" type="filled")
    | Primary filled
  ck-button.mr-2.mb-2(color="warning" type="filled")
    | Secondary filled
  ck-button.mr-2.mb-2(color="danger")
    | Danger outlined
  ck-button.mr-2.mb-2(color="danger" type="filled")
    | Danger filled
  h5 Group
  .w-half
    .flex
      ck-button.w-full(group="left" group-vertical="top")
        | 1
      ck-button.w-full(group="center" group-vertical="top")
        | 2
      ck-button.w-full(group="right" group-vertical="top")
        | 3
    .flex
      ck-button.w-full(group="left" group-vertical="center")
        | 4
      ck-button.w-full(group="center" group-vertical="center")
        | 5
      ck-button.w-full(group="right" group-vertical="center")
        | 6
    .flex
      ck-button.w-full(group="left" group-vertical="bottom")
        | 7
      ck-button.w-full(group="center" group-vertical="bottom")
        | 8
      ck-button.w-full(group="right" group-vertical="bottom")
        | 9
  h5 Icons
  ck-button(group="left" icon="list-ul")
    | Icon left
  ck-button(group="center" icon-right="star")
    | Icon right
  ck-button(group="right" icon="user" icon-right="dove")
    | Both icons
</template>

<style lang="stylus" scoped></style>
