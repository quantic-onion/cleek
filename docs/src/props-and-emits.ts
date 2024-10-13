export type PropItemType = 
  'boolean'
| 'number'
| 'string'
| 'string | number'
| 'any[]'
| 'Angle'
| 'Align'
| 'AlignLeftOrRight'
| 'AlignVertical'
| 'ButtonType'
| 'Color'
| 'Icon'
| 'IconFlip'
| 'IconPack'
| 'IconSize'
| 'InputTypeHTML'
| 'Layout'
| 'PositionCSS'
| 'ReduceFuncion'
| 'ResizeValues'
| 'Size'
| 'SizeInCSS'
| 'SizeInput'
| 'SizeLabel'
| 'TableColumn[]'
| 'WidthBreaks';

export type PropItem = {
  property: string;
  type: PropItemType;
  description: string;
  default: string;
  // values: string;
}
export type EmitItem = {
  property: string;
  params: string;
  description: string;
}
type ComponentsTypesAndEmits = {
  props: PropItem[],
  emits: EmitItem[],
}

export const propItemValuesByType = {
boolean: ['true', 'false'],
string: [''],
number: [''],
'string | number': [''],
'any[]': [''],
Angle: ['number from 0 to 360'],
Align: ['left', 'center', 'right'],
AlignLeftOrRight: ['left', 'right'],
AlignVertical: ['top', 'bottom', 'center'],
ButtonType: ['filled', 'outlined', 'flat'],
Color: [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'dark',
  'light',
  '__hex color',
  '__rgb color',
],
Icon: ['__icon name'],
IconFlip: ['horizontal', 'vertical', 'both'],
IconPack: ['font-awesome'],
IconSize: ['xs', 's', 'm', 'l', 'xl', 'x1', 'x2', 'x3', '...', 'xN'],
InputTypeHTML: [
  'color',
  'date',
  'datetime',
  'file',
  'month',
  'number',
  'password',
  'range',
  'text',
  'time',
  'week',
],
Layout: ['base', 'rounded', 'squared'],
PositionCSS: ['static', 'relative', 'fixed', 'absolute', 'sticky'],
ReduceFuncion: ['Function to simplify object (item) => itemValue'],
ResizeValues: ['true', 'both', 'none', 'horizontal', 'vertical'],
Size: ['xs', 's', 'm', 'l', 'xl'],
SizeInCSS: ['__size in px or any css value'],
SizeInput: ['s', 'm', 'l', 'xl'],
SizeLabel: ['s', 'm', 'l', 'xl'],
'TableColumn[]': [], // FIXME
WidthBreaks: ['[[widthValue, sizeInCSS]]'],
};

export const propsAndEmits: {
  button: ComponentsTypesAndEmits,
  checkbox: ComponentsTypesAndEmits,
  chip: ComponentsTypesAndEmits,
  div: ComponentsTypesAndEmits,
  dropdown: ComponentsTypesAndEmits,
  icon: ComponentsTypesAndEmits,
  img: ComponentsTypesAndEmits,
  input: ComponentsTypesAndEmits,
  label: ComponentsTypesAndEmits,
  navbar: ComponentsTypesAndEmits,
  notify: ComponentsTypesAndEmits,
  popup: ComponentsTypesAndEmits,
  radio: ComponentsTypesAndEmits,
  select: ComponentsTypesAndEmits,
  sidebar: ComponentsTypesAndEmits,
  switch: ComponentsTypesAndEmits,
  'switch-options': ComponentsTypesAndEmits,
  table: ComponentsTypesAndEmits,
  textarea: ComponentsTypesAndEmits,
} = {
  button: {
    props: [
      {
        property: 'title',
        type: 'string',
        description: 'HTML title attribute',
        default: '',
      },
      {
        property: 'disabled',
        type: 'boolean',
        description: 'HTML disabled attribute',
        default: 'false',
      },
      {
        property: 'type',
        type: 'ButtonType',
        description: 'Shape style type',
        default: 'outlined',
      },
      {
        property: 'color',
        type: 'Color',
        description: 'Background color',
        default: 'primary',
      },
      {
        property: 'align',
        type: 'Align',
        description: 'Content align',
        default: 'left',
      },
      {
        property: 'size',
        type: 'Size',
        description: 'Size of button and text',
        default: 'm',
      },
      {
        property: 'width',
        type: 'SizeInCSS',
        description: 'CSS width ',
        default: '',
      },
      {
        property: 'layout',
        type: 'Layout',
        description: 'Border radius style',
        default: 'base',
      },
      {
        property: 'icon',
        type: 'Icon',
        description: 'Left icon name',
        default: '',
      },
      {
        property: 'icon-right',
        type: 'Icon',
        description: 'Right icon name',
        default: '',
      },
      {
        property: 'icon-pack',
        type: 'IconPack',
        description: 'Icon pack of left and right',
        default: 'font-awesome',
      },
      {
        property: 'label',
        type: 'string',
        description: 'HTML label',
        default: '',
      },
      {
        property: 'label-align',
        type: 'Align',
        description: 'Label align',
        default: 'left',
      },
      {
        property: 'width-breaks',
        type: 'WidthBreaks',
        description: 'Responsive width style breaks depending on window width',
        default: '',
      },
      {
        property: 'group',
        type: 'Align',
        description: 'Border styles for grouping components horizontally',
        default: '',
      },
      {
        property: 'group-vertical',
        type: 'AlignVertical',
        description:  'Border styles for grouping components vertically',
        default: '',
      },
    ], // props
    emits: [], // emits
  }, // button
  checkbox: {
    props: [
      {
        property: 'v-model',
        type: 'boolean',
        description:  'Variable value',
        default: '',
      },
      {
        property: 'label',
        type: 'string',
        description: 'HTML label',
        default: '',
      },
      {
        property: 'disabled',
        type: 'boolean',
        description: 'HTML disabled attribute',
        default: '',
      },
    ], // props
    emits: [], // emits
  }, // checkbox
  chip: {
    props: [
      {
        property: 'size',
        type: 'Size',
        description: 'Size of chip and text',
        default: 'm',
      },
      {
        property: 'text-color',
        type: 'Color',
        description: 'Text color',
        default: 'white',
      },
      {
        property: 'color',
        type: 'Color',
        description: 'Background color',
        default: 'primary',
      },
      {
        property: 'icon',
        type: 'Icon',
        description: 'Left icon name',
        default: '',
      },
      {
        property: 'icon-pack',
        type: 'IconPack',
        description: 'Icon pack of left and right',
        default: 'font-awesome',
      },
    ], // props
    emits: [], // emits
  }, // chip
  div: {
    props: [
      {
        property: 'width-breaks',
        type: 'WidthBreaks',
        description: 'Responsive width style breaks depending on window width',
        default: '',
      },
    ], // props
    emits: [], // emits
  }, // div
  dropdown: {
    props: [
      {
        property: 'align',
        type: 'Align',
        description: 'Opening align',
        default: 'left',
      },
      {
        property: 'dark',
        type: 'boolean',
        description: 'Dark background color',
        default: '',
      },
      {
        property: 'layout',
        type: 'Layout',
        description: 'Border radius style',
        default: 'base',
      },
    ], // props
    emits: [], // emits
  }, // dropdown
  icon: {
    props: [
      {
        property: 'icon',
        type: 'Icon',
        description: 'Left icon name',
        default: '',
      },
      {
        property: 'icon-pack',
        type: 'IconPack',
        description: 'Icon pack of left and right',
        default: 'font-awesome',
      },
      {
        property: 'color',
        type: 'Color',
        description: 'Icon color',
        default: 'black',
      },
      {
        property: 'size',
        type: 'IconSize',
        description: 'Size',
        default: '',
      },
      {
        property: 'flip',
        type: 'IconFlip',
        description: 'Flip icon as mirror',
        default: '',
      },
      {
        property: 'fixedWidth',
        type: 'boolean',
        description: 'Helps when trying to align icons in a vertical column',
        default: '',
      },
      {
        property: 'rotation',
        type: 'Angle',
        description: 'Angle of rotation',
        default: '0',
      },
      {
        property: 'spin',
        type: 'boolean',
        description: 'Activate rotation in continuos style',
        default: '',
      },
      {
        property: 'pulse',
        type: 'boolean',
        description: 'Activate rotation in discrete style',
        default: '',
      },
    ], // props
    emits: [], // emits
  },
  img: {
    props: [
      {
        property: 'src',
        type: 'string',
        description: 'HTML src attribute, joined to configured server url',
        default: '',
      },
      // {
      //   property: 'failImgSrc',
      //   type: 'string',
      //   description: 'Img src to replace on case not founded main img',
      //   default: '',
      // },
      {
        property: 'alt',
        type: 'string',
        description: 'HTML alt attribute',
        default: '',
      },
      {
        property: 'size',
        type: 'Size',
        description: 'Size fixed of both width and height',
        default: '',
      },
      {
        property: 'sizeAbsolute',
        type: 'SizeInCSS',
        description: 'Size fixed of both width and height',
        default: '',
      },
      {
        property: 'width',
        type: 'SizeInCSS',
        description: 'Size fixed of width',
        default: '',
      },
      {
        property: 'height',
        type: 'SizeInCSS',
        description: 'Size fixed of height',
        default: '',
      },
      // {
      //   property: 'zoom',
      //   type: 'boolean',
      //   description: 'Fullscreen zoom img on click',
      //   default: 'false',
      // },
      // {
      //   property: 'zoom-title',
      //   type: 'string',
      //   description: 'title of img to show when fullscreen zooming',
      //   default: '',
      // },
      {
        property: 'has-border',
        type: 'boolean',
        description: 'Add border to img',
        default: 'false',
      },
      {
        property: 'border-color',
        type: 'Color',
        description: 'Color of the border',
        default: '#eeeeee',
      },
      {
        property: 'rounded',
        type: 'boolean',
        description: 'Border radius to 5000px',
        default: 'false',
      },
      {
        property: 'radius',
        type: 'SizeInCSS',
        description: 'CSS border radius added to img container',
        default: '0.5rem',
      },
    ], // props
    emits: [], // emits
  }, // img
  input: {
    props: [
      {
        property: 'v-model',
        type: 'string | number',
        description:  'Variable value',
        default: '',
      },
      {
        property: 'type',
        type: 'InputTypeHTML',
        description: 'HTML input type attribute',
        default: 'text',
      },
      {
        property: 'autocomplete',
        type: 'boolean',
        description: 'Browser autocomplete function',
        default: 'false',
      },
      {
        property: 'disabled',
        type: 'boolean',
        description: 'HTML disabled attribute',
        default: 'false',
      },
      {
        property: 'placeholder',
        type: 'string',
        description: 'HTML placeholder attribute',
        default: '',
      },
      {
        property: 'label',
        type: 'string',
        description: 'HTML label',
        default: '',
      },
      {
        property: 'label-align',
        type: 'Align',
        description: 'Label align',
        default: 'left',
      },
      {
        property: 'icon',
        type: 'Icon',
        description: 'Left icon name',
        default: '',
      },
      {
        property: 'icon-right',
        type: 'Icon',
        description: 'Right icon name',
        default: '',
      },
      {
        property: 'icon-pack',
        type: 'IconPack',
        description: 'Icon pack of left and right',
        default: 'font-awesome',
      },
      {
        property: 'group',
        type: 'Align',
        description: 'Border styles for grouping components horizontally',
        default: '',
      },
      {
        property: 'group-vertical',
        type: 'AlignVertical',
        description:  'Border styles for grouping components vertically',
        default: '',
      },
      {
        property: 'width-breaks',
        type: 'WidthBreaks',
        description: 'Responsive width style breaks depending on window width',
        default: '',
      },
      {
        property: 'size',
        type: 'SizeInput',
        description: 'Size of input and text',
        default: 'm',
      },
      {
        property: 'hide-border',
        type: 'boolean',
        description: 'Border transparent',
        default: 'false',
      },
      {
        property: 'font-size',
        type: 'SizeInCSS',
        description: 'CSS font-size',
        default: '14px',
      },
      {
        property: 'width',
        type: 'SizeInCSS',
        description: 'Size fixed of width',
        default: '',
      },
      {
        property: 'align',
        type: 'Align',
        description: 'Content align',
        default: 'left',
      },
      {
        property: 'layout',
        type: 'Layout',
        description: 'Border radius style',
        default: 'base',
      },
      {
        property: 'border-color',
        type: 'Color',
        description: 'Color of the border',
        default: '#eeeeee',
      },
      {
        property: 'autoSelect',
        type: 'boolean',
        description: 'Automatic select context on focus',
        default: 'false',
      },
      {
        property: 'capitalize',
        type: 'boolean',
        description: 'Automatic capitalize first char',
        default: 'false',
      },
      {
        property: 'delayChangeTime',
        type: 'number',
        description: 'changeDelayed emit function time',
        default: '300',
      },
    ], // props
    emits: [], // emits
  }, // input
  label: {
    props: [
      {
        property: 'align',
        type: 'Align',
        description: 'Text align',
        default: 'left',
      },
      {
        property: 'size',
        type: 'SizeLabel',
        description: 'font-size',
        default: 'm',
      },
    ], // props
    emits: [], // emits
  }, // label
  navbar: {
    props: [
      {
        property: 'padding',
        type: 'SizeInCSS',
        description: 'transparent padding',
        default: '0px',
      },
      {
        property: 'position',
        type: 'PositionCSS',
        description: 'CSS position',
        default: 'fixed',
      },
    ], // props
    emits: [], // emits
  }, // navbar
  notify: {
    props: [], // props
    emits: [], // emits
  }, // notify
  popup: {
    props: [
      {
        property: 'v-model',
        type: 'boolean',
        description: 'Popup open and visible',
        default: 'false',
      },
      {
        property: 'title',
        type: 'string',
        description: 'Popup title on header',
        default: '',
      },
      {
        property: 'confirm-buttons',
        type: 'boolean',
        description: 'Show buttons of confirm and cancel at footer',
        default: 'false',
      },
      {
        property: 'accept-button',
        type: 'boolean',
        description: 'Show accept button on footer',
        default: 'false',
      },
      {
        property: 'accept-btn-text',
        type: 'string',
        description: 'Text of accept button on footer',
        default: 'Accept',
      },
      {
        property: 'accept-btn-type',
        type: 'ButtonType',
        description: 'Type of accept button on footer',
        default: 'outlined',
      },
      {
        property: 'cancel-button',
        type: 'boolean',
        description: 'Show cancel button on footer',
        default: 'false',
      },
      {
        property: 'cancel-btn-text',
        type: 'string',
        description: 'Text of cancel button on footer',
        default: 'Cancel',
      },
      {
        property: 'cancel-btn-type',
        type: 'ButtonType',
        description: 'Type of cancel button on footer',
        default: 'flat',
      },
      {
        property: 'not-close-btn',
        type: 'boolean',
        description: 'Hide top right close button',
        default: 'false',
      },
      {
        property: 'not-close-by-bg',
        type: 'boolean',
        description: 'Not close popup by clicking in the background',
        default: 'false',
      },
      {
        property: 'not-close',
        type: 'boolean',
        description: 'Hide top right close btn and prevent close by clicking in the background',
        default: 'false',
      },
      {
        property: 'prevent-close-on-cancel',
        type: 'boolean',
        description: 'Stop default behavior of cancel button on footer of close popup',
        default: 'false',
      },
      {
        property: 'width',
        type: 'SizeInCSS',
        description: 'CSS width ',
        default: 'unset',
      },
      {
        property: 'max-width',
        type: 'SizeInCSS',
        description: 'CSS max-width ',
        default: 'unset',
      },
      {
        property: 'layout',
        type: 'Layout',
        description: 'Border radius style',
        default: 'base',
      },
      {
        property: 'text-color',
        type: 'Color',
        description: 'Text color',
        default: 'unset',
      },
      {
        property: 'header-color',
        type: 'Color',
        description: 'Header background color',
        default: 'white',
      },
      {
        property: 'header-align',
        type: 'Align',
        description: 'Header content align',
        default: 'left',
      },
      {
        property: 'font-size',
        type: 'SizeInCSS',
        description: 'Content font-size',
        default: 'unset',
      },
    ], // props
    emits: [], // emits
  }, // popup
  radio: {
    props: [
      {
        property: 'v-model',
        type: 'boolean',
        description: 'Selected option',
        default: 'false',
      },
      {
        property: 'options', // FIXME
        type: 'any[]',
        description: 'Array of options, one for each radio input',
        default: '[]',
      },
      {
        property: 'name',
        type: 'string',
        description: 'Radio input name',
        default: '',
      },
      {
        property: 'disabled',
        type: 'boolean',
        description: 'HTML disabled attribute',
        default: 'false',
      },
    ], // props
    emits: [], // emits
  }, // radio
  select: {
    props: [
      {
        property: 'v-model',
        type: 'boolean',
        description: 'Selected option',
        default: 'false',
      },
      {
        property: 'reduce-value-prop', // FIXME
        type: 'string',
        description: '', // FIXME
        default: '',
      },
      {
        property: 'reduce-name-prop',
        type: 'string',
        description: '', // FIXME
        default: '',
      },
      {
        property: 'not-reduce-value',
        type: 'boolean',
        description: 'Option value es item in array without reducion',
        default: 'false',
      },
      {
        property: 'not-reduce',
        type: 'boolean',
        description: 'Not reduce value and not reduce name',
        default: 'false',
      },
      {
        property: 'options',
        type: 'any[]',
        description: 'Array of options, one for each radio input',
        default: '[]',
      },
      {
        property: 'reduce-name-function',
        type: 'ReduceFuncion',
        description: 'Function to simplify option object, take option as item and return string to use as LABEL in option',
        default: '(item) => item.name',
      },
      {
        property: 'reduce-value-function',
        type: 'ReduceFuncion',
        description: 'Function to simplify option object, take option as item and return string to use as VALUE in option',
        default: '(item) => item.id',
      },
      {
        property: 'not-clearable',
        type: 'boolean',
        description: 'Hide right cross button to clear input value',
        default: 'false',
      },
      {
        property: 'width',
        type: 'SizeInCSS',
        description: 'CSS width ',
        default: 'unset',
      },
      {
        property: 'min-width',
        type: 'SizeInCSS',
        description: 'CSS min-width ',
        default: 'unset',
      },
      {
        property: 'layout',
        type: 'Layout',
        description: 'Border radius style',
        default: 'base',
      },
      {
        property: 'no-border',
        type: 'boolean',
        description: 'Hide border',
        default: 'false',
      },
      {
        property: 'border-color',
        type: 'Color',
        description: 'Color of the border',
        default: '#DAE1E7', 
      },
      {
        property: 'bg-transparent',
        type: 'boolean',
        description: 'Background color transparent',
        default: 'false',
      },
      {
        property: 'disabled',
        type: 'boolean',
        description: 'HTML disabled attribute',
        default: 'false',
      },
      {
        property: 'group',
        type: 'Align',
        description: 'Border styles for grouping components horizontally',
        default: '',
      },
      {
        property: 'group-vertical',
        type: 'AlignVertical',
        description:  'Border styles for grouping components vertically',
        default: '',
      },
      {
        property: 'width-breaks',
        type: 'WidthBreaks',
        description: 'Responsive width style breaks depending on window width',
        default: '',
      },
      {
        property: 'icon',
        type: 'Icon',
        description: 'Left icon name',
        default: '',
      },
      {
        property: 'icon-right',
        type: 'Icon',
        description: 'Right icon name',
        default: '',
      },
      {
        property: 'icon-pack',
        type: 'IconPack',
        description: 'Icon pack of left and right',
        default: 'font-awesome',
      },
      {
        property: 'label',
        type: 'string',
        description: 'HTML label',
        default: '',
      },
      {
        property: 'label-align',
        type: 'Align',
        description: 'Label align',
        default: 'left',
      },
    ], // props
    emits: [], // emits
  }, // select
  sidebar: {
    props: [
      {
        property: 'v-model',
        type: 'boolean',
        description: 'Sidebar open',
        default: 'false',
      },
      {
        property: 'title',
        type: 'string',
        description: 'Sidebar title on header',
        default: '',
      },
      {
        property: 'width',
        type: 'SizeInCSS',
        description: 'CSS width ',
        default: 'unset',
      },
      {
        property: 'right-side',
        type: 'boolean',
        description: 'Open sidebar on the right side of the screen',
        default: 'false',
      },
      {
        property: 'header-color',
        type: 'Color',
        description: 'Header background color',
        default: 'white',
      },
      {
        property: 'header-align',
        type: 'Align',
        description: 'Header content align',
        default: 'left',
      },
      {
        property: 'close-btn-align',
        type: 'AlignLeftOrRight',
        description: 'Close btn on header align',
        default: 'left',
      },
      {
        property: 'not-close-btn',
        type: 'boolean',
        description: 'Hide close button on header',
        default: 'false',
      },
    ], // props
    emits: [], // emits
  }, // sidebar
  switch: {
    props: [
      {
        property: 'v-model',
        type: 'boolean',
        description: 'Popup open and visible',
        default: 'false',
      },
      {
        property: 'disabled',
        type: 'boolean',
        description: 'HTML disabled attribute',
        default: 'false',
      },
      {
        property: 'outlined',
        type: 'boolean',
        description: 'Style of border',
        default: 'false',
      },
      {
        property: 'squared',
        type: 'boolean',
        description: 'Style of shape',
        default: 'false',
      },
      {
        property: 'size',
        type: 'Size',
        description: 'Size',
        default: 's',
      },
      {
        property: 'icon',
        type: 'Icon',
        description: 'Icon name on circle',
        default: '',
      },
      {
        property: 'icon-pack',
        type: 'IconPack',
        description: 'Icon pack of left and right',
        default: 'font-awesome',
      },
    ], // props
    emits: [], // emits
  }, // switch
  'switch-options': {
    props: [
      {
        property: 'v-model',
        type: 'boolean',
        description: 'Selected item value',
        default: 'false',
      },
      {
        property: 'options', // FIXME
        type: 'any[]',
        description: 'Array of options, one for each item',
        default: '[]',
      },
      {
        property: 'prop', // FIXME
        type: 'string',
        description: '', // FIXME
        default: '',
      },
      {
        property: 'notReduce', // FIXME
        type: 'string',
        description: '', // FIXME
        default: '',
      },
      {
        property: 'reduceFunction', // FIXME
        type: 'string', // FIXME
        description: '', // FIXME
        default: '',
      },
      {
        property: 'label',
        type: 'string',
        description: 'HTML label',
        default: '',
      },
      {
        property: 'label-align',
        type: 'Align',
        description: 'Label align',
        default: 'left',
      },
      {
        property: 'width-breaks',
        type: 'WidthBreaks',
        description: 'Responsive width style breaks depending on window width',
        default: '',
      },
      {
        property: 'group',
        type: 'Align',
        description: 'Border styles for grouping components horizontally',
        default: '',
      },
      {
        property: 'group-vertical',
        type: 'AlignVertical',
        description:  'Border styles for grouping components vertically',
        default: '',
      },
      {
        property: 'same-width-options',
        type: 'boolean',
        description: 'Make each option item same width',
        default: 'false',
      },
    ], // props
    emits: [], // emits
  }, // switch-options
  table: { // FIXME
    props: [
      {
        property: 'v-model:search',
        type: 'string',
        description: 'Text search',
        default: '',
      },
      {
        property: 'v-model:current-page',
        type: 'number',
        description: 'Current page showed in table',
        default: '0',
      },
      {
        property: 'columns',
        type: 'TableColumn[]',
        description: 'List of columns',
        default: '[]',
      },
      {
        property: 'has-columns-manager',
        type: 'boolean',
        description: 'Show columns manager button at the top right of the tables',
        default: 'false',
      },
      {
        property: 'page-size',
        type: 'number',
        description: 'Quantity of items per page',
        default: '0',
      },
      {
        property: 'list-length',
        type: 'number',
        description: 'Full lenght of the list (not just the listed in table)',
        default: '-1',
      },
      {
        property: 'pagination-align',
        type: 'Align',
        description: 'Pagination align',
        default: 'center',
      },
      {
        property: 'hide-header-actions',
        type: 'boolean',
        description: 'Hide all default header function like search, items per page, column manager and refresh button',
        default: 'false',
      },
      {
        property: 'show-refresh-btn', // FIXME no tendría que ser hide?
        type: 'boolean',
        description: 'Show refresh button on table header',
        default: 'false',
      },
      {
        property: 'hide-items-per-page',
        type: 'boolean',
        description: 'Hide items per page summary at table header',
        default: 'false',
      },
      {
        property: 'not-full-width',
        type: 'boolean',
        description: 'Table width is not automatic instead of 100%',
        default: '',
      },
      {
        property: 'cell-padding',
        type: 'SizeInCSS',
        description: 'Padding for every td tag in the table',
        default: '0.5rem',
      },
      {
        property: 'cell-padding-y',
        type: 'SizeInCSS',
        description: 'Padding top and bottom for every td tag in the table',
        default: '0.5rem',
      },
      {
        property: 'no-results-text',
        type: 'string',
        description: 'Message to show instead of the table content when listLenght === 0',
        default: 'No results found',
      },
      {
        property: 'not-overflow',
        type: 'boolean',
        description: 'Set overflow initial instead of overflow auto',
        default: 'false',
      },
      {
        property: 'layout',
        type: 'Layout',
        description: 'Border radius style',
        default: 'base',
      },
      {
        property: 'mobile-max-width',
        type: 'number',
        description: 'Number of px of screen width to change desktop slot to mobile slot',
        default: '0',
      },
    ], // props
    emits: [], // emits
  }, // table
  textarea: {
    props: [
      {
        property: 'v-model',
        type: 'boolean',
        description: 'Selected item value',
        default: 'false',
      },
      {
        property: 'placeholder',
        type: 'string',
        description: 'HTML placeholder attribute',
        default: '',
      },
      {
        property: 'label',
        type: 'string',
        description: 'HTML label',
        default: '',
      },
      {
        property: 'label-align',
        type: 'Align',
        description: 'Label align',
        default: 'left',
      },
      {
        property: 'layout',
        type: 'Layout',
        description: 'Border radius style',
        default: 'base',
      },
      {
        property: 'disabled',
        type: 'boolean',
        description: 'HTML disabled attribute',
        default: 'false',
      },
      {
        property: 'resize',
        type: 'ResizeValues',
        description: 'Resize CSS value',
        default: 'none',
      },
      {
        property: 'align',
        type: 'Align',
        description: 'Text align',
        default: '',
      },
      {
        property: 'group',
        type: 'Align',
        description: 'Border styles for grouping components horizontally',
        default: '',
      },
      {
        property: 'group-vertical',
        type: 'AlignVertical',
        description:  'Border styles for grouping components vertically',
        default: '',
      },
      {
        property: 'text-color',
        type: 'Color',
        description: 'Color of the text',
        default: '#33333',
      },
      {
        property: 'border-color',
        type: 'Color',
        description: 'Color of the border',
        default: '#dae1e7',
      },
      {
        property: 'border-radius',
        type: 'SizeInCSS',
        description: 'Radius of the border',
        default: '4px',
      },
      {
        property: 'font-size',
        type: 'SizeInCSS',
        description: 'CSS font-size',
        default: 'unset',
      },
      {
        property: 'width',
        type: 'SizeInCSS',
        description: 'CSS width',
        default: 'unset',
      },
      {
        property: 'height',
        type: 'SizeInCSS',
        description: 'CSS height',
        default: '6rem',
      },
      {
        property: 'capitalize',
        type: 'boolean',
        description: 'Automatic capitalize first char',
        default: 'false',
      },
      {
        property: 'autoSelect',
        type: 'boolean',
        description: 'Automatic select context on focus',
        default: 'false',
      },
    ], // props
    emits: [], // emits
  }, // textarea
}

// TODO agregar td y esas cosas de table



      // {
      //   property: ,
      //   type: ,
      //   description: ,
      //   default: ,
      // },