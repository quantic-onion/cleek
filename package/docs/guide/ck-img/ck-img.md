# Icon

Easily access font-awesome / feather icons.

<CkImgExample/>

```vue
<ck-icon icon="Helicopter"/>

<ck-icon spin icon="spinner"/>

<ck-icon icon="user"/>
```

| Prop        | Description               | Accepted Values                 | Default        |
| :---------  | :------------------------ | :------------------------------ | :----------    |
| `icon`      | Icon name                 | -                               | `undefined`    |
| `icon-pack` | Icon's brand              | `font-awesome`, `feather`       | `font-awesome` |

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `click` | Triggered on icon click   | `$clickEvent` |

<script setup>
import CkImgExample from './CkImgExample.vue'
</script>
