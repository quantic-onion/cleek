# Select

Easily access font-awesome / feather selects.

<CkSelectExample/>

```vue
<div>
  <div> Selected ID: {{ selectedId }}</div>
  <ck-select
  label="¿Quién es el más lindo?"
  v-model="selectedId"
  :options="options"
  />
<div>
</div>
  <div> Selected option: {{ selectedOption }}</div>
  <ck-select
  notReduce
  label="¿Quién es el más lindo?"
  v-model="selectedOption"
  :options="options"
  />
</div>
```

| Prop          | Description     | Accepted Values            | Default        |
| :-----------  | :-------------- | :------------------------- | :------------- |
| `select`      | Select name     | -                          | `undefined`    |
| `select-pack` | Select's brand  | `font-awesome`, `feather`  | `font-awesome` |

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `click` | Triggered on select click | `$clickEvent` |

<script setup>
import CkSelectExample from './CkSelectExample.vue'
</script>
