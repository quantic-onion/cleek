# Button

The button component is a simple customizable button.

<ButtonExample/>

```vue
<ck-button>
  Outlined (default)
</ck-button>

<ck-button type="filled">
  Filled
</ck-button>

<ck-button type="text">
  Text
</ck-button>

<ck-button disabled>
  Disabled
</ck-button>
```

| Prop       | Description               | Accepted Values                 | Default     |
| :--------- | :------------------------ | :------------------------------ | :---------- |
| `label`    | The button's text         | -                               | `undefined` |
| `title`    | HTML title attribute      | -                               | `undefined` |
| `type`     | Visual type of button     | `default`, `outlined` or `text` | `default`   |
| `disabled` | HTML's disabled attribute | `true` or `false` || 1 or 0     | `false`     |

| Event   | Description               | Parameters    |
| :------ | :------------------------ | :------------ |
| `click` | Triggered on button click | `$clickEvent` |

<script setup>
import ButtonExample from './ButtonExample.vue'
</script>
