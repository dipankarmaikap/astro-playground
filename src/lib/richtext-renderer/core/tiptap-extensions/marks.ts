import { Mark } from "@tiptap/core";
import Bold from "@tiptap/extension-bold";
import Code from "@tiptap/extension-code";
import Highlight from "@tiptap/extension-highlight";
import Italic from "@tiptap/extension-italic";
import LinkOriginal from "@tiptap/extension-link";
import Strike from "@tiptap/extension-strike";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";

// Unmodified mark extensions
export {
  Bold,
  Code,
  Highlight,
  Italic,
  Strike,
  Subscript,
  Superscript,
  TextStyleKit,
  Underline,
};

// Link with Storyblok-specific attributes and renderHTML
export const StoryblokLink = LinkOriginal.extend({
  addAttributes() {
    return {
      href: {
        parseHTML: (element: HTMLElement) => element.getAttribute("href"),
      },
      uuid: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-uuid") || null,
      },
      anchor: {
        default: null,
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-anchor") || null,
      },
      target: {
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("target") || null,
      },
      linktype: {
        default: "url",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-linktype") || "url",
      },
    };
  },
});

// Link with custom attributes support
export const StoryblokLinkWithCustomAttributes = StoryblokLink;

// Anchor mark (renders as span with id)
export const StoryblokAnchor = Mark.create({
  name: "anchor",
  addAttributes() {
    return {
      id: { default: null },
    };
  },
});

export interface StyledOptions {
  allowedStyles?: string[];
}

// Styled mark with whitelisted CSS classes
export const StoryblokStyled = Mark.create<StyledOptions>({
  name: "styled",
});

// TextStyle mark
export const StoryblokTextStyle = Mark.create({
  name: "textStyle",
  addAttributes() {
    return {
      class: { default: null },
      id: { default: null },
      color: { default: null },
    };
  },
});

// Reporter mark: parse-only diagnostic, no renderHTML needed
export const Reporter = Mark.create({
  name: "reporter",
  priority: 0,
  addOptions() {
    return {
      allowCustomAttributes: false,
    };
  },
});
