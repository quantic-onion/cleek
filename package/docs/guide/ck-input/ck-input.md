# Input

<CkInputExample/>

```vue
<p>{{ text }}</p>
<Input label="Example text" v-model="text" />
```

| Prop          | Description                                   | Accepted Values   | Default     |
| :------------ | :-------------------------------------------- | :---------------- | :---------- |
| `modelValue`  | A variable for you to hook into using v-model | -                 | `undefined` |
| `label`       | The input's label                             | -                 | `undefined` |
| `placeholder` | The input's placeholder                       | -                 | `undefined` |
| `name`        | The input's HTML name (useful for forms)      | -                 | `undefined` |
| `required`    | HTML's required attribute                     | `true` or `false` | `false`     |
| `disabled`    | HTML's disabled attribute                     | `true` or `false` | `false`     |

| Event               | Description                     | Parameters                |
| :------------------ | :------------------------------ | :------------------------ |
| `update:modelValue` | Triggered on native input event | `newValue`:  on input |

<script setup>
import CkInputExample from './CkInputExample.vue'
</script>
