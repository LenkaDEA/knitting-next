export const Meta = {
  initial: 'initial',
  loading: 'loading',
  error: 'error',
  success: 'success',
} as const;

export type MetaType = (typeof Meta)[keyof typeof Meta];

export const PAGE_SIZE = 9;

export const TOOLS = {
  hook: 'hook',
  needles: 'needles',
} as const;

export type ToolValue = (typeof TOOLS)[keyof typeof TOOLS];
