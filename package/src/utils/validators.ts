export default {
  // general
  size: (type) => {
    return ['', 'xs', 's', 'm', 'l', 'xl'].includes(type)
  },
  group: (type) => {
    return ['', 'left', 'right', 'center'].includes(type)
  },
  groupVertical: (type) => {
    return ['top', 'bottom', 'center'].includes(type)
  },
  align: (type) => {
    return ['left', 'center', 'right'].includes(type)
  },
  // specials
  buttonType: (type) => {
    return ['filled', 'outlined', 'flat'].includes(type)
  },
  inputType: (type) => {
    return ['text', 'number', 'date', 'time', 'password'].includes(type)
  },
  radioOptions: (options) => {
    let isValid = true
    options.forEach((option) => {
      isValid = isValid && 'label' in option && 'value' in option
    })
    return isValid
  },
}; // export default