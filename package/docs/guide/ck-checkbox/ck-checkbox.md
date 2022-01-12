# Checkbox

<CkCheckboxExample/>

```vue
<p>State: {{ state }}</p>
<Checkbox label="Checkbox" v-model="state" />
```

| Prop         | Description                                   | Accepted Values   | Default     |
| :----------- | :-------------------------------------------- | :---------------- | :---------- |
| `modelValue` | A variable for you to hook into using v-model | -                 | `undefined` |
| `label`      | The checkbox's label                          | -                 | `undefined` |
| `disabled`   | HTML's disabled attribute                     | `true` or `false` | `false`     |

| Event               | Description                       | Parameters                |
| :------------------ | :-------------------------------- | :------------------------ |
| `update:modelValue` | Triggered on checked state change | `newValue`: Checked state |

<script setup>
import CkCheckboxExample from './CkCheckboxExample.vue'
</script>
