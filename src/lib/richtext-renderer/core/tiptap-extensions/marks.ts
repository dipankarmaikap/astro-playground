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
export { Bold, Code, Italic, Strike, Subscript, Superscript, Underline };

export const StoryblokHighlight = Highlight.extend({
  addAttributes() {
    return {
      color: {
        default: null,
      },
    };
  },
});

// Link with Storyblok-specific attributes and renderHTML
export const StoryblokLink = LinkOriginal.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      linktype: {}, // Making linktype required
    };
  },
});

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
  addAttributes() {
    return {
      class: {
        default: null,
      },
    };
  },
});

// TextStyle mark
export const StoryblokTextStyle = TextStyleKit;

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
