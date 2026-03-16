import type { Node as PMNode, Mark as PMMark } from "@tiptap/pm/model";

export interface TiptapNodeAttributes {
  'paragraph': {
    'textAlign'?: any;
  };
  'doc': Record<string, never>;
  'text': Record<string, never>;
  'blockquote': Record<string, never>;
  'heading': {
    'textAlign'?: any;
    'level'?: number;
  };
  'bullet_list': Record<string, never>;
  'ordered_list': {
    'start'?: number;
    'type'?: any;
    'order'?: number;
  };
  'list_item': Record<string, never>;
  'code_block': {
    'class'?: string | null;
  };
  'hard_break': Record<string, never>;
  'horizontal_rule': Record<string, never>;
  'image': {
    'src'?: string | null;
    'alt'?: string | null;
    'title'?: string | null;
    'width'?: any;
    'height'?: any;
    'id'?: any;
    'source'?: any;
    'copyright'?: any;
    'meta_data'?: any;
  };
  'emoji': {
    'name'?: any;
    'emoji'?: any;
    'fallbackImage'?: any;
  };
  'table': Record<string, never>;
  'tableRow': Record<string, never>;
  'tableCell': {
    'colspan'?: number;
    'rowspan'?: number;
    'colwidth'?: any;
    'backgroundColor'?: any;
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
    'href'?: string | null;
    'target'?: string;
    'rel'?: string;
    'class'?: string | null;
    'title'?: string | null;
    'linktype'?: string | null;
  };
  'textStyle': {
    'backgroundColor'?: any;
    'color'?: any;
    'fontFamily'?: any;
    'fontSize'?: any;
    'lineHeight'?: any;
  };
  'bold': Record<string, never>;
  'italic': Record<string, never>;
  'strike': Record<string, never>;
  'underline': Record<string, never>;
  'code': Record<string, never>;
  'superscript': Record<string, never>;
  'subscript': Record<string, never>;
  'highlight': {
    'color'?: any;
  };
  'anchor': {
    'id'?: any;
  };
  'styled': {
    'class'?: string | null;
  };
  'reporter': Record<string, never>;
}

export type TiptapNodeName = keyof TiptapNodeAttributes;
export type TiptapMarkName = keyof TiptapMarkAttributes;
export type TiptapComponentName = TiptapNodeName | TiptapMarkName;

export type TiptapAllAttributes = TiptapNodeAttributes & TiptapMarkAttributes;

/**
 * Framework-agnostic base props for any mapped RichText component.
 *
 * - `attrs` — the Tiptap extension attributes (e.g. `{ level: 1 }` for heading)
 * - `node` — raw ProseMirror Node (nodes only), for advanced use cases
 * - `mark` — raw ProseMirror Mark (marks only), for advanced use cases
 */
export type RichTextComponentProps<T extends TiptapComponentName> = {
  attrs: T extends TiptapNodeName
    ? TiptapNodeAttributes[T]
    : T extends TiptapMarkName
      ? TiptapMarkAttributes[T]
      : Record<string, any>;

  node?: T extends TiptapNodeName ? PMNode : undefined;
  mark?: T extends TiptapMarkName ? PMMark : undefined;
};
