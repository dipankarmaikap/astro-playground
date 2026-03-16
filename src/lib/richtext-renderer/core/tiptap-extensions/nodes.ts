import { Node } from "@tiptap/core";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import {
  Details,
  DetailsContent,
  DetailsSummary,
} from "@tiptap/extension-details";
import {
  Table,
  TableCell,
  TableHeader,
  TableRow,
} from "@tiptap/extension-table";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Document from "@tiptap/extension-document";
import Emoji from "@tiptap/extension-emoji";
import HardBreak from "@tiptap/extension-hard-break";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";

// Re-export unmodified extensions
export { Details, DetailsContent, DetailsSummary, Document, Text };

export const StoryblokTextAlign = TextAlign.configure({
  types: ["heading", "paragraph"],
});

export const StoryblokBlockquote = Blockquote;
export const StoryblokParagraph = Paragraph;
export const StoryblokHeading = Heading;
export const StoryblokTableRow = TableRow;

// Storyblok uses snake_case names for some extensions
export const StoryblokBulletList = BulletList.extend({
  name: "bullet_list",
  addOptions() {
    return { ...this.parent!(), itemTypeName: "list_item" };
  },
});

export const StoryblokOrderedList = OrderedList.extend({
  name: "ordered_list",
  addOptions() {
    return { ...this.parent!(), itemTypeName: "list_item" };
  },
});

export const StoryblokListItem = ListItem.extend({
  name: "list_item",
  addOptions() {
    return {
      ...this.parent!(),
      bulletListTypeName: "bullet_list",
      orderedListTypeName: "ordered_list",
    };
  },
});

export const StoryblokCodeBlock = CodeBlock.extend({
  name: "code_block",
});
export const StoryblokHardBreak = HardBreak.extend({ name: "hard_break" });
export const StoryblokHorizontalRule = HorizontalRule.extend({
  name: "horizontal_rule",
});

// Table with custom renderHTML
// Note: thead/tbody grouping is handled by the richtext renderer,
// which inspects child rows to detect header vs body rows.
export const StoryblokTable = Table;

// Table cell with custom style handling
export const StoryblokTableCell = TableCell;

// Table header with custom style handling
export const StoryblokTableHeader = TableHeader;

// Image with optimizeImages support
export const StoryblokImage = Image;

// Emoji with custom renderHTML
export const StoryblokEmoji = Emoji;

// Blok node (component placeholder for vanilla usage)
// Configure `renderComponent` option to render blok components in framework SDKs.
// Similar to PHP Tiptap extension's `renderer` callback:
// https://github.com/storyblok/php-tiptap-extension/blob/main/src/Node/Blok.php
export const ComponentBlok = Node.create({
  name: "blok",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      id: { default: null },
      body: { default: [] },
    };
  },
});
