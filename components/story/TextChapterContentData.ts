export const PROHIBITED_NAMES_TAGS = [
  'A',
  'BUTTON',
  'DETAILS',
  'EMBED',
  'IFRAME',
  'KEYGEN',
  'LABEL',
  'SELECT',
  'SELECTED', // – CUSTOM TAG
  'SELECTION', // – CUSTOM TAG
  'TEXTAREA',
];

export const ALLOWED_NAMES_TAGS = [
  'ABBR',
  'B',
  'BDO',
  'BR',
  'CODE',
  'DATA',
  'DEL',
  'DFN',
  'EM',
  'I',
  'INPUT',
  'INS',
  'KBD',
  'MARK',
  'Q',
  'RUBY',
  'SAMP',
  'SMALL',
  'SPAN',
  'STRONG',
  'SUB',
  'SUP',
  'TIME',
  'VAR',
];

export const SELECTION_TAG = 'selection';
export const SELECTION_TAGS_LENGTH = `<${SELECTION_TAG}></${SELECTION_TAG}>`.length;
export const SELECTED_TAG = 'selected';
export const SELECTED_TAGS_LENGTH = `<${SELECTED_TAG}></${SELECTED_TAG}>`.length;
export const SELECTION_TAG_REGEX = /<(selection|\/selection)[^>]*>/g;
export const SELECTED_TAG_REGEX = /<(selected|\/selected)[^>]*>/g;
export const ANCHOR_TAG_REGEX = /<(a|\/a)[^>]*>/g;
export const REGEX_ID = /\s(id|class)="[^"]+"/;
export const TAGS_WITH_DELETING_STYLES_REGEX = /(<(?!(div|iframe))[^<)]+?>)/g;
export const STYLE_ATTR_REGEX = /style="[^"]*"/gi;
export const TAGS_WITH_TRIM_SPACES_REGEX = /(p|blockquote)>\s+|\s+<\/(p|blockquote)/g;
