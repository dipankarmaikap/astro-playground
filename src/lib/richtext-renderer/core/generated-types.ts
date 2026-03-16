// THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY.

export interface TiptapNodeAttributes {
  'paragraph': Record<string, never>;
  'doc': Record<string, never>;
  'text': Record<string, never>;
  'blockquote': Record<string, never>;
  'heading': {
    'level'?: number;
  };
  'bullet_list': Record<string, never>;
  'ordered_list': {
    'start'?: number;
    'type'?: any;
  };
  'list_item': Record<string, never>;
  'code_block': {
    'language'?: any;
  };
  'hard_break': Record<string, never>;
  'horizontal_rule': Record<string, never>;
  'image': {
    'src'?: any;
    'alt'?: any;
    'title'?: any;
    'width'?: any;
    'height'?: any;
  };
  'emoji': {
    'name'?: any;
  };
  'table': Record<string, never>;
  'tableRow': Record<string, never>;
  'tableCell': {
    'colspan'?: number;
    'rowspan'?: number;
    'colwidth'?: any;
  };
  'tableHeader': {
    'colspan'?: number;
    'rowspan'?: number;
    'colwidth'?: any;
  };
  'blok': {
    'id'?: any;
    'body'?: any;
  };
  'details': Record<string, never>;
  'detailsContent': Record<string, never>;
  'detailsSummary': Record<string, never>;
}

export interface TiptapMarkAttributes {
  'link': {
    'href'?: any;
    'uuid'?: any;
    'anchor'?: any;
    'target'?: any;
    'linktype'?: string;
  };
  'bold': Record<string, never>;
  'italic': Record<string, never>;
  'strike': Record<string, never>;
  'underline': Record<string, never>;
  'code': Record<string, never>;
  'superscript': Record<string, never>;
  'subscript': Record<string, never>;
  'highlight': Record<string, never>;
  'textStyle': {
    'class'?: any;
    'id'?: any;
    'color'?: any;
  };
  'anchor': {
    'id'?: any;
  };
  'styled': Record<string, never>;
  'reporter': Record<string, never>;
}

export type TiptapAllAttributes = TiptapNodeAttributes & TiptapMarkAttributes;
