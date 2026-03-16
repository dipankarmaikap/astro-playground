import type React from "react";
import type { TiptapComponentName, RichTextComponentProps as BaseRichTextComponentProps } from "../core/tiptap-schema.generated";

/**
 * React unified component props, injecting children into the generated Base props.
 */
export type RichTextComponentProps<T extends TiptapComponentName> = 
  React.PropsWithChildren<BaseRichTextComponentProps<T>>;

/**
 * Strict mapping of React components to available Tiptap Nodes and Marks.
 */
export type ComponentMap = {
  [K in TiptapComponentName]?: React.ComponentType<RichTextComponentProps<K>>;
};
