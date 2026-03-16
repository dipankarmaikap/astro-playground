import type { TiptapJSON } from "../lib/richtext-renderer/core/types.js";

// Complex Sample Document matching React
export const sampleDoc: TiptapJSON = {
  type: "doc",
  content: [
    {
      type: "heading",
      attrs: {
        level: 1,
        textAlign: null,
      },
      content: [
        {
          text: "Building a Modern Rich Text System",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "Rich text editors are used ",
          type: "text",
        },
        {
          text: "everywhere",
          type: "text",
          marks: [
            {
              type: "styled",
              attrs: {
                class: "highlight",
              },
            },
          ],
        },
        {
          text: ": ",
          type: "text",
        },
        {
          text: "documentation",
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
        },
        {
          text: ", ",
          type: "text",
        },
        {
          text: "blogs",
          type: "text",
          marks: [
            {
              type: "italic",
            },
          ],
        },
        {
          text: ", ",
          type: "text",
        },
        {
          text: "product pages",
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "italic",
            },
          ],
        },
        {
          text: ", and even ",
          type: "text",
        },
        {
          text: "small ",
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "italic",
            },
            {
              type: "styled",
              attrs: {
                class: "red",
              },
            },
          ],
        },
        {
          text: "UI descriptions. A good editor must support formatting, links, lists, quotes, code, and media.",
          type: "text",
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Basic Formatting",
          type: "text",
          marks: [
            {
              type: "styled",
              attrs: {
                class: "red",
              },
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "You can combine multiple inline styles:",
          type: "text",
        },
      ],
    },
    {
      type: "bullet_list",
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Bold text",
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Italic text",
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "~~Strikethrough text~~",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Inline code",
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Bold + Italic combined",
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                    {
                      type: "italic",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "Example sentence:",
          type: "text",
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          attrs: {
            textAlign: null,
          },
          content: [
            {
              text: "This is ",
              type: "text",
            },
            {
              text: "bold",
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
            },
            {
              text: ", this is ",
              type: "text",
            },
            {
              text: "italic",
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
            },
            {
              text: ", and this is ",
              type: "text",
            },
            {
              text: "bold italic",
              type: "text",
              marks: [
                {
                  type: "bold",
                },
                {
                  type: "italic",
                },
              ],
            },
            {
              text: " ",
              type: "text",
            },
            {
              text: "while ",
              type: "text",
              marks: [
                {
                  type: "styled",
                  attrs: {
                    class: "highlight",
                  },
                },
              ],
            },
            {
              text: "const value = 42",
              type: "text",
              marks: [
                {
                  type: "code",
                },
              ],
            },
            {
              text: " is inline code.",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Links",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "External link:",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "OpenAI",
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://openai.com",
                uuid: null,
                anchor: null,
                target: null,
                linktype: "url",
              },
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "Link with title:",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "Visit GitHub",
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://github.com",
                uuid: null,
                anchor: null,
                target: null,
                linktype: "url",
              },
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "Relative/internal link:",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "Go to the blog",
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "/storyblok-react",
                uuid: "312afdcd-defe-45e2-b950-43e01af2d8a4",
                anchor: null,
                target: "_self",
                linktype: "story",
              },
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "You can also combine links with ",
          type: "text",
        },
        {
          text: "formatting",
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "/integrity-portal-faq-pdf",
                uuid: "6b024f22-f343-4221-be6a-5e7706b63c1e",
                anchor: "test-anchore",
                target: "_self",
                linktype: "story",
              },
            },
          ],
        },
        {
          text: ":",
          type: "text",
        },
      ],
    },
    {
      type: "bullet_list",
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Bold Link",
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://example.com",
                        uuid: null,
                        anchor: null,
                        target: null,
                        linktype: "url",
                      },
                    },
                    {
                      type: "bold",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Italic Link",
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://example.com",
                        uuid: null,
                        anchor: null,
                        target: null,
                        linktype: "url",
                      },
                    },
                    {
                      type: "italic",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Bold Italic Link",
                  type: "text",
                  marks: [
                    {
                      type: "link",
                      attrs: {
                        href: "https://example.com",
                        uuid: null,
                        anchor: null,
                        target: null,
                        linktype: "url",
                      },
                    },
                    {
                      type: "bold",
                    },
                    {
                      type: "italic",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Headings",
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
        textAlign: null,
      },
      content: [
        {
          text: "Heading Level 3",
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 4,
        textAlign: null,
      },
      content: [
        {
          text: "Heading Level 4",
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 5,
        textAlign: null,
      },
      content: [
        {
          text: "Heading Level 5",
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 6,
        textAlign: null,
      },
      content: [
        {
          text: "Heading Level 6",
          type: "text",
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Lists",
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
        textAlign: null,
      },
      content: [
        {
          text: "Unordered List",
          type: "text",
        },
      ],
    },
    {
      type: "bullet_list",
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "First item",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Second item",
                  type: "text",
                },
              ],
            },
            {
              type: "bullet_list",
              content: [
                {
                  type: "list_item",
                  content: [
                    {
                      type: "paragraph",
                      attrs: {
                        textAlign: null,
                      },
                      content: [
                        {
                          text: "Nested item",
                          type: "text",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "list_item",
                  content: [
                    {
                      type: "paragraph",
                      attrs: {
                        textAlign: null,
                      },
                      content: [
                        {
                          text: "Another nested item",
                          type: "text",
                        },
                      ],
                    },
                    {
                      type: "bullet_list",
                      content: [
                        {
                          type: "list_item",
                          content: [
                            {
                              type: "paragraph",
                              attrs: {
                                textAlign: null,
                              },
                              content: [
                                {
                                  text: "Deep nested",
                                  type: "text",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Third item",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
        textAlign: null,
      },
      content: [
        {
          text: "Ordered List",
          type: "text",
        },
      ],
    },
    {
      type: "ordered_list",
      attrs: {
        order: 1,
      },
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "First step",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Second step",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Third step",
                  type: "text",
                },
              ],
            },
            {
              type: "ordered_list",
              attrs: {
                order: 1,
              },
              content: [
                {
                  type: "list_item",
                  content: [
                    {
                      type: "paragraph",
                      attrs: {
                        textAlign: null,
                      },
                      content: [
                        {
                          text: "Sub step",
                          type: "text",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "list_item",
                  content: [
                    {
                      type: "paragraph",
                      attrs: {
                        textAlign: null,
                      },
                      content: [
                        {
                          text: "Another sub step",
                          type: "text",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Text AlignMent",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "right",
      },
      content: [
        {
          text: "This is center",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "center",
      },
      content: [
        {
          text: "This is middle",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "left",
      },
      content: [
        {
          text: "This is left",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: "justify",
      },
      content: [
        {
          text: "This is a group of text set to be It is a long ",
          type: "text",
        },
        {
          text: "established ",
          type: "text",
          marks: [
            {
              type: "textStyle",
              attrs: {
                color: "#EA0C0C",
              },
            },
          ],
        },
        {
          text: "fact that a reader will be distracted by the ",
          type: "text",
        },
        {
          text: "readable ",
          type: "text",
          marks: [
            {
              type: "highlight",
              attrs: {
                color: "#009DE1",
              },
            },
          ],
        },
        {
          text: "content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of ",
          type: "text",
        },
        {
          text: "letters",
          type: "text",
          marks: [
            {
              type: "textStyle",
              attrs: {
                color: "#DC2865",
              },
            },
            {
              type: "highlight",
              attrs: {
                color: "#B5ECFC",
              },
            },
          ],
        },
        {
          text: ", as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Task List",
          type: "text",
        },
      ],
    },
    {
      type: "bullet_list",
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "[x] Write documentation",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "[x] Implement rich text renderer",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "[ ] Add framework adapters",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "[ ] Improve accessibility",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Blockquote",
          type: "text",
        },
      ],
    },
    {
      type: "blockquote",
      content: [
        {
          type: "paragraph",
          attrs: {
            textAlign: null,
          },
          content: [
            {
              text: "A blockquote is useful for highlighting important information.",
              type: "text",
            },
          ],
        },
        {
          type: "paragraph",
          attrs: {
            textAlign: null,
          },
          content: [
            {
              text: "It can span multiple lines and even contain ",
              type: "text",
            },
            {
              text: "formatting",
              type: "text",
              marks: [
                {
                  type: "bold",
                },
              ],
            },
            {
              text: " or ",
              type: "text",
            },
            {
              text: "links",
              type: "text",
              marks: [
                {
                  type: "italic",
                },
              ],
            },
            {
              text: " like",
              type: "text",
            },
            {
              type: "hard_break",
            },
            {
              text: "documentation",
              type: "text",
              marks: [
                {
                  type: "link",
                  attrs: {
                    href: "https://example.com/docs",
                    uuid: null,
                    anchor: null,
                    target: null,
                    linktype: "url",
                  },
                },
              ],
            },
            {
              text: ".",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Code Blocks",
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
        textAlign: null,
      },
      content: [
        {
          text: "JavaScript",
          type: "text",
        },
      ],
    },
    {
      type: "code_block",
      attrs: {
        class: null,
      },
      content: [
        {
          text: 'function renderRichText(doc) {\n  return doc.content.map(node => {\n    if (node.type === "paragraph") {\n      return `<p>${node.text}</p>`;\n    }\n  });\n}',
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 3,
        textAlign: null,
      },
      content: [
        {
          text: "TypeScript",
          type: "text",
        },
      ],
    },
    {
      type: "code_block",
      attrs: {
        class: null,
      },
      content: [
        {
          text: "type Mark = {\n  type: string\n  attrs?: Record<string, unknown>\n}\n\ntype Node = {\n  type: string\n  content?: Node[]\n  marks?: Mark[]\n}",
          type: "text",
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Table",
          type: "text",
        },
      ],
    },
    {
      type: "table",
      content: [
        {
          type: "tableRow",
          content: [
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Feature",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Supported",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [274],
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Notes",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "tableRow",
          content: [
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Bold",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      type: "emoji",
                      attrs: {
                        name: "white_check_mark",
                        emoji: "✅",
                        fallbackImage:
                          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png",
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [274],
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Basic formatting",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "tableRow",
          content: [
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Italic",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      type: "emoji",
                      attrs: {
                        name: "white_check_mark",
                        emoji: "✅",
                        fallbackImage:
                          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png",
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [274],
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Inline styling",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "tableRow",
          content: [
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Links",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      type: "emoji",
                      attrs: {
                        name: "white_check_mark",
                        emoji: "✅",
                        fallbackImage:
                          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png",
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [274],
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "External + internal",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "tableRow",
          content: [
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Code",
                      type: "text",
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: null,
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      type: "emoji",
                      attrs: {
                        name: "white_check_mark",
                        emoji: "✅",
                        fallbackImage:
                          "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png",
                      },
                    },
                  ],
                },
              ],
            },
            {
              type: "tableCell",
              attrs: {
                colspan: 1,
                rowspan: 1,
                colwidth: [274],
                backgroundColor: null,
              },
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Inline + block",
                      type: "text",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "| Feature | Supported | Notes               | | ------- | --------- | ------------------- | | Bold    | ",
          type: "text",
        },
        {
          type: "emoji",
          attrs: {
            name: "white_check_mark",
            emoji: "✅",
            fallbackImage:
              "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png",
          },
        },
        {
          text: "         | Basic formatting    | | Italic  | ",
          type: "text",
        },
        {
          type: "emoji",
          attrs: {
            name: "white_check_mark",
            emoji: "✅",
            fallbackImage:
              "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png",
          },
        },
        {
          text: "         | Inline styling      | | Links   | ",
          type: "text",
        },
        {
          type: "emoji",
          attrs: {
            name: "white_check_mark",
            emoji: "✅",
            fallbackImage:
              "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png",
          },
        },
        {
          text: "         | External + internal | | Code    | ",
          type: "text",
        },
        {
          type: "emoji",
          attrs: {
            name: "white_check_mark",
            emoji: "✅",
            fallbackImage:
              "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/2705.png",
          },
        },
        {
          text: "         | Inline + block      |",
          type: "text",
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Horizontal Rule",
          type: "text",
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Mixed Content Example",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "Here is a paragraph containing ",
          type: "text",
        },
        {
          text: "bold text",
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
        },
        {
          text: ", ",
          type: "text",
        },
        {
          text: "italic text",
          type: "text",
          marks: [
            {
              type: "italic",
            },
          ],
        },
        {
          text: ", ~~strikethrough~~, and a ",
          type: "text",
        },
        {
          text: "link to documentation",
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://example.com/docs",
                uuid: null,
                anchor: null,
                target: null,
                linktype: "url",
              },
            },
          ],
        },
        {
          text: ".",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "You can also include ",
          type: "text",
        },
        {
          text: "inline code",
          type: "text",
          marks: [
            {
              type: "code",
            },
          ],
        },
        {
          text: " like:",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "npm install richtext-renderer",
          type: "text",
          marks: [
            {
              type: "code",
            },
          ],
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Image",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          type: "image",
          attrs: {
            id: 15839148,
            alt: "",
            src: "https://a.storyblok.com/f/273116/4240x2832/b1ff254988/nic-chi-guvnhd3hbxw-unsplash.jpg",
            title: "",
            source: "",
            copyright: "",
            meta_data: {},
          },
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Nested Formatting Example",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "This paragraph demonstrates ",
          type: "text",
        },
        {
          text: "bold text that contains ",
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
        },
        {
          text: "italic inside it",
          type: "text",
          marks: [
            {
              type: "bold",
            },
            {
              type: "italic",
            },
          ],
        },
        {
          text: " and even a ",
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
        },
        {
          text: "formatted link",
          type: "text",
          marks: [
            {
              type: "link",
              attrs: {
                href: "https://example.com",
                uuid: null,
                anchor: null,
                target: null,
                linktype: "url",
              },
            },
            {
              type: "bold",
            },
          ],
        },
        {
          text: " which rich text editors should correctly parse.",
          type: "text",
        },
      ],
    },
    {
      type: "horizontal_rule",
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Final Paragraph",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "A fully featured rich text editor should support:",
          type: "text",
        },
      ],
    },
    {
      type: "bullet_list",
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "headings",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "paragraphs",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "formatting (",
                  type: "text",
                },
                {
                  text: "bold",
                  type: "text",
                  marks: [
                    {
                      type: "bold",
                    },
                  ],
                },
                {
                  text: ", ",
                  type: "text",
                },
                {
                  text: "italic",
                  type: "text",
                  marks: [
                    {
                      type: "italic",
                    },
                  ],
                },
                {
                  text: ", ",
                  type: "text",
                },
                {
                  text: "code",
                  type: "text",
                  marks: [
                    {
                      type: "code",
                    },
                  ],
                },
                {
                  text: ")",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "links",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "lists",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "blockquotes",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "code blocks",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "tables",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "images",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "horizontal rules",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      attrs: {
        textAlign: null,
      },
      content: [
        {
          text: "All of these structures appear in the document above and represent most structures a modern ",
          type: "text",
        },
        {
          text: "CMS rich text editor",
          type: "text",
          marks: [
            {
              type: "bold",
            },
          ],
        },
        {
          text: " typically produces.",
          type: "text",
        },
      ],
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "Cusom Storyblok Blok",
          type: "text",
        },
      ],
    },
    {
      type: "blok",
      attrs: {
        id: "3dcdf6e7-34b2-4b14-9dfe-1fdb916c410e",
        body: [
          {
            _uid: "i-658ac0e1-7592-4a29-aec1-41b76722648a",
            video_id: "-2a-W0a_KcU",
            component: "richtext-youtube",
            _editable:
              '<!--#storyblok#{"name": "richtext-youtube", "space": "273116", "uid": "i-658ac0e1-7592-4a29-aec1-41b76722648a", "id": "155172200397800"}-->',
          },
          {
            _uid: "i-5088bcfe-0c8d-4f4d-bb42-6619f679de4a",
            lead: "Until the mid 1990's, we didn't even know that other solar systems existed.",
            text: {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "There are many things we don't know about space. The mysteries of black holes, dark matter, dark energy, quantum entanglement, antimatter, and so much more. ",
                      type: "text",
                    },
                  ],
                },
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                  content: [
                    {
                      text: "Follow along with us to learn more.",
                      type: "text",
                      marks: [
                        {
                          type: "bold",
                        },
                      ],
                    },
                  ],
                },
                {
                  type: "paragraph",
                  attrs: {
                    textAlign: null,
                  },
                },
                {
                  type: "ordered_list",
                  attrs: {
                    order: 1,
                  },
                  content: [
                    {
                      type: "list_item",
                      content: [
                        {
                          type: "paragraph",
                          attrs: {
                            textAlign: null,
                          },
                          content: [
                            {
                              text: "List item one",
                              type: "text",
                              marks: [
                                {
                                  type: "bold",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "list_item",
                      content: [
                        {
                          type: "paragraph",
                          attrs: {
                            textAlign: null,
                          },
                          content: [
                            {
                              text: "List item two",
                              type: "text",
                              marks: [
                                {
                                  type: "bold",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      type: "list_item",
                      content: [
                        {
                          type: "paragraph",
                          attrs: {
                            textAlign: null,
                          },
                          content: [
                            {
                              text: "This is a richtext list item inside a blok-> richtext",
                              type: "text",
                              marks: [
                                {
                                  type: "bold",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            button: [
              {
                _uid: "i-7ed83d7b-cc42-4db7-a6d2-ea4649b36b07",
                link: {
                  id: "",
                  url: "",
                  linktype: "story",
                  fieldtype: "multilink",
                  cached_url: "",
                },
                size: "medium",
                label: "Begin your journey",
                style: "default",
                component: "button",
                text_color: "light",
                border_radius: "default",
                background_color: "primary",
                _editable:
                  '<!--#storyblok#{"name": "button", "space": "273116", "uid": "i-7ed83d7b-cc42-4db7-a6d2-ea4649b36b07", "id": "155172200397800"}-->',
              },
            ],
            headline: "We don't know what we don't know.",
            alignment: "center",
            component: "text-section",
            background_color: "light",
            overlap_preceding_hero: false,
            _editable:
              '<!--#storyblok#{"name": "text-section", "space": "273116", "uid": "i-5088bcfe-0c8d-4f4d-bb42-6619f679de4a", "id": "155172200397800"}-->',
          },
          {
            _uid: "i-d1a6ee1e-189e-4913-aba3-8d3c7eb832a7",
            badge: {
              id: 15085788,
              alt: "",
              name: "",
              focus: "",
              title: "",
              source: "",
              filename:
                "https://a.storyblok.com/f/273116/2880x1680/802ad8dc3c/07-confitional-fields.png",
              copyright: "",
              fieldtype: "asset",
              meta_data: {},
              is_external_url: false,
            },
            component: "badge",
            _editable:
              '<!--#storyblok#{"name": "badge", "space": "273116", "uid": "i-d1a6ee1e-189e-4913-aba3-8d3c7eb832a7", "id": "155172200397800"}-->',
          },
        ],
      },
    },
    {
      type: "heading",
      attrs: {
        level: 2,
        textAlign: null,
      },
      content: [
        {
          text: "This is emojis in Storyblok",
          type: "text",
        },
      ],
    },
    {
      type: "ordered_list",
      attrs: {
        order: 1,
      },
      content: [
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "This is a happy Emoji ",
                  type: "text",
                },
                {
                  type: "emoji",
                  attrs: {
                    name: "grinning",
                    emoji: "😀",
                    fallbackImage:
                      "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f600.png",
                  },
                },
                {
                  text: " ",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Sad ",
                  type: "text",
                },
                {
                  type: "emoji",
                  attrs: {
                    name: "relieved",
                    emoji: "😌",
                    fallbackImage:
                      "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f60c.png",
                  },
                },
                {
                  text: " ",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "list_item",
          content: [
            {
              type: "paragraph",
              attrs: {
                textAlign: null,
              },
              content: [
                {
                  text: "Rocket ",
                  type: "text",
                },
                {
                  type: "emoji",
                  attrs: {
                    name: "blue_heart",
                    emoji: "💙",
                    fallbackImage:
                      "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f499.png",
                  },
                },
                {
                  text: " ",
                  type: "text",
                },
                {
                  type: "emoji",
                  attrs: {
                    name: "slightly_smiling_face",
                    emoji: "🙂",
                    fallbackImage:
                      "https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f642.png",
                  },
                },
                {
                  text: " ",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
