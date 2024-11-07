export const floatingVueConfig = {
  themes: {
    tooltip: {
      triggers: ['hover', 'focus', 'touch'],
      hideTriggers: (events) => [...events],
    },
  },
} as const;
