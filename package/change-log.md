# Change Log

## Version ?.?.?

### Component: ck-checkbox.vue

1. $slots.default (que se usaba para agregar un label) eliminado, en si lugar se usa la props "label"

### Component: ck-input.vue

1. emit('delayChange', val) --> emit('changeDelayed', val)
2. change: [event: Event] --> change: [value: Value] (antes se emita con el @change del input, ahora se emite cuando cambia el modelValue desde dentro del componente unicamente)
3. defineExpose "setFocus" --> "focus"