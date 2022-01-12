# Label

Label for almost every component

<CkLabelExample/>

```vue
<ck-label>
  label-example
</ck-label>

<ck-label align="center">
  Helicopter
</ck-label>

<ck-label align="right">
  Jerardo Sofovich
</ck-label>
```

| Prop     | Description  | Accepted Values           | Default  |
| :------- | :----------- | :------------------------ | :------  |
| `align`  | text align   | 'left', 'center', 'rigth' | `left`   |

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `click` | Triggered on label click  | `$clickEvent` |

<script setup>
import CkLabelExample from './CkLabelExample.vue'
</script>
