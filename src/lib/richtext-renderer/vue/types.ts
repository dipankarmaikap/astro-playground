import type { Component } from "vue";
import type {
  TiptapComponentName,
  RichTextComponentProps as BaseRichTextComponentProps,
} from "../core/tiptap-schema.generated";

/**
 * Vue unified component props — same shape as the generated base props.
 * Vue components receive these as `defineProps<RichTextComponentProps<'heading'>>()`.
 */
export type RichTextComponentProps<T extends TiptapComponentName> =
  BaseRichTextComponentProps<T>;

/**
 * Strict mapping of Vue components to available Tiptap Nodes and Marks.
 */
export type ComponentMap = {
  [K in TiptapComponentName]?: Component<RichTextComponentProps<K>>;
};
