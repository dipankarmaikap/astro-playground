// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.

export interface TiptapNodeAttributes {
  'paragraph': {
    'textAlign'?: null;
  };
  'doc': Record<string, never>;
  'text': Record<string, never>;
  'blockquote': Record<string, never>;
  'heading': {
    'textAlign'?: null;
    'level'?: number;
  };
  'bullet_list': Record<string, never>;
  'ordered_list': {
    'start'?: number;
    'type'?: null;
    'order'?: number;
  };
  'list_item': Record<string, never>;
  'code_block': {
    'class'?: null;
  };
  'hard_break': Record<string, never>;
  'horizontal_rule': Record<string, never>;
  'image': {
    'src'?: null;
    'alt'?: null;
    'title'?: null;
    'width'?: null;
    'height'?: null;
    'id'?: null;
    'source'?: null;
    'copyright'?: null;
    'meta_data'?: null;
  };
  'emoji': {
    'name'?: null;
  };
  'table': Record<string, never>;
  'tableRow': Record<string, never>;
  'tableCell': {
    'colspan'?: number;
    'rowspan'?: number;
    'colwidth'?: null;
    'backgroundColor'?: null;
  };
  'tableHeader': {
    'colspan'?: number;
    'rowspan'?: number;
    'colwidth'?: null;
  };
  'blok': {
    'id'?: null;
    'body'?: any;
  };
  'details': Record<string, never>;
  'detailsContent': Record<string, never>;
  'detailsSummary': Record<string, never>;
}

export interface TiptapMarkAttributes {
  'link': {
    'href'?: null;
    'target'?: string;
    'rel'?: string;
    'class'?: null;
    'title'?: null;
    'linktype'?: null;
  };
  'textStyle': {
    'backgroundColor'?: null;
    'color'?: null;
    'fontFamily'?: null;
    'fontSize'?: null;
    'lineHeight'?: null;
  };
  'bold': Record<string, never>;
  'italic': Record<string, never>;
  'strike': Record<string, never>;
  'underline': Record<string, never>;
  'code': Record<string, never>;
  'superscript': Record<string, never>;
  'subscript': Record<string, never>;
  'highlight': {
    'color'?: null;
  };
  'anchor': {
    'id'?: null;
  };
  'styled': {
    'class'?: null;
  };
  'reporter': Record<string, never>;
}

export type TiptapNodeName = keyof TiptapNodeAttributes;
export type TiptapMarkName = keyof TiptapMarkAttributes;

export type TiptapAllAttributes = TiptapNodeAttributes & TiptapMarkAttributes;
