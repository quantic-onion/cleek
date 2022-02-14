# Radio

Radio

<CkRadioExample/>

```js
const options = [
  {
    label: 'Label 1',
    value: 'value1',
  },
  {
    label: 'Label 2',
    value: 'value2',
  },
]
```

```vue
<p>{{ selectedValue }}</p>
<Radio name="example" :options="options" v-model="selectedValue" />
```

| Prop       | Description          | Accepted Values | Default     |
| :--------- | :------------------- | :-------------- | :---------- |
| `name`     | HTML's name prop     | -               | `undefined` |
| `options`  | Options array        | -               | `undefined` |
| `disabled` | HTML's disabled prop | `true`, `false` | `false`     |

| Event    | Description               | Parameters     |
| :------  | :------------------------ | :------------- |
| `update` | Triggered on update event | `$updateEvent` |
| `change` | Triggered on change event | `$changeEvent` |


<script setup>
import CkRadioExample from './CkRadioExample.vue'
</script>
