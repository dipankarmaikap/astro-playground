import type { RichTextComponentProps, StoryblokRichTextComponentMap, TiptapComponentName } from "@storyblok/richtext/static"
import type { ReactNode } from "react";

export type SBReactRichTextComponentProps<
  T extends TiptapComponentName,
> = RichTextComponentProps<T> & {
  children?: ReactNode;
};

export type SBReactComponentMap = StoryblokRichTextComponentMap<
  ReactNode,
  { children?: ReactNode }
>;
