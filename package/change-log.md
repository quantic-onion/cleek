# Change Log

## Version ?.?.?

### Component: ck-awitch-options.vue

1. prop?: string --> reduceValueProp?: string
2. notReduce?: boolean --> notReduceValue?: boolean
3. reduceFunction?: (option: Option) => any --> reduceValueFunction?: (option: Option) => OptionValue

## Version ?.?.?

### Component: ck-select.vue

1. options?: Option[] --> options: Option[]
2. props.prop eliminada

### Component: ck-input.vue

1. emit('delayChange', val) --> emit('changeDelayed', val)
2. change: [event: Event] --> change: [value: Value] (antes se emita con el @change del input, ahora se emite cuando cambia el modelValue desde dentro del componente unicamente)
3. defineExpose "setFocus" --> "focus"