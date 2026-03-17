/**
 * react/RichTextRenderer.tsx — React adapter for the rich text renderer.
 *
 * Uses the shared core traversal logic with React-specific element creation.
 */

import React, { useMemo } from "react";
import type { JSONContent } from "@tiptap/core";
import { CoreRenderer, VOID_ELEMENTS } from "../core/renderer";
import type { ParsedDOMSpec, BlokBody } from "../core/types";
import type { ComponentMap, RichTextComponentProps } from "./types";
import {
  traverseDocument,
  type FrameworkAdapter,
  type NodeComponentProps,
  type MarkComponentProps,
} from "../core/traverse";
import { normalizeDOMAttrs } from "../core/attrs";
import { REACT_ATTR_RENAME } from "./attrs";

export interface ReactRichTextRendererProps {
  /** The Tiptap/ProseMirror JSON document to render */
  doc: JSONContent;
  /** Custom components to use for specific node/mark types */
  components?: ComponentMap;
  /**
   * Called when a `blok` node is encountered.
   * Return React elements for the Storyblok component(s).
   *
   * @example
   * ```tsx
   * import { StoryblokComponent } from '@storyblok/react';
   *
   * <RichTextRenderer
   *   doc={doc}
   *   blokResolver={(bloks) => (
   *     <>
   *       {bloks.map(blok => (
   *         <StoryblokComponent key={blok._uid} blok={blok} />
   *       ))}
   *     </>
   *   )}
   * />
   * ```
   */
  blokResolver?: (bloks: BlokBody[]) => React.ReactNode;
}

// Re-export for standardizing Custom Component Authoring
export type { RichTextComponentProps };

/** Normalises raw Tiptap toDOM() attrs for React (renames + style merging). */
function normalizeAttrsForReact(rawAttrs: Record<string, any>): Record<string, any> {
  return normalizeDOMAttrs(rawAttrs, REACT_ATTR_RENAME);
}

/**
 * Recursively render a ParsedDOMSpec tree as React elements.
 */
function renderDOMSpecToReact(
  spec: ParsedDOMSpec,
  children: React.ReactNode[],
  key: string
): React.ReactElement {
  const props = normalizeAttrsForReact(spec.attrs);
  props.key = key;

  // Build the content by processing spec.children
  const content: React.ReactNode[] = [];
  spec.children.forEach((child, i) => {
    if (typeof child === "string") {
      content.push(child);
    } else if ("hole" in child && child.hole) {
      // Inject the actual children into the hole
      content.push(<React.Fragment key={`hole-${i}`}>{children}</React.Fragment>);
    } else {
      // Nested DOM spec - recurse (pass children down for nested holes)
      content.push(renderDOMSpecToReact(child as ParsedDOMSpec, children, `${key}-child-${i}`));
    }
  });

  // Void elements don't have children
  if (VOID_ELEMENTS.has(spec.tag.toLowerCase())) {
    return React.createElement(spec.tag, props);
  }

  return React.createElement(spec.tag, props, content.length > 0 ? content : null);
}

/**
 * React adapter implementation for the shared traversal system.
 */
const reactAdapter: FrameworkAdapter<React.ReactNode, ComponentMap> = {
  createText(text: string, key: string): React.ReactNode {
    return <React.Fragment key={key}>{text}</React.Fragment>;
  },

  createFragment(children: React.ReactNode[], key?: string): React.ReactNode {
    return key ? (
      <React.Fragment key={key}>{children}</React.Fragment>
    ) : (
      <>{children}</>
    );
  },

  renderCustomNode(
    Component: React.ComponentType<any>,
    props: NodeComponentProps,
    children: React.ReactNode[],
    key: string
  ): React.ReactNode {
    return (
      <Component
        key={key}
        node={props.node}
        attrs={props.attrs}
        parsedDOM={props.parsedDOM}
      >
        {children.length > 0 ? children : null}
      </Component>
    );
  },

  renderCustomMark(
    Component: React.ComponentType<any>,
    props: MarkComponentProps,
    child: React.ReactNode,
    key: string
  ): React.ReactNode {
    return (
      <Component
        key={key}
        mark={props.mark}
        attrs={props.attrs}
        parsedDOM={props.parsedDOM}
      >
        {child}
      </Component>
    );
  },

  renderDOMSpec(
    spec: ParsedDOMSpec,
    children: React.ReactNode[],
    key: string
  ): React.ReactNode {
    return renderDOMSpecToReact(spec, children, key);
  },

  getComponent(componentMap: ComponentMap, name: string): React.ComponentType<any> | undefined {
    return componentMap[name as keyof ComponentMap] as React.ComponentType<any> | undefined;
  },
};

/**
 * React component for rendering Tiptap/ProseMirror rich text content.
 *
 * @example
 * ```tsx
 * import { RichTextRenderer } from '@storyblok/richtext-renderer/react';
 *
 * // Basic usage
 * <RichTextRenderer doc={richTextData} />
 *
 * // With custom components
 * <RichTextRenderer
 *   doc={richTextData}
 *   components={{
 *     heading: ({ attrs, children }) => (
 *       <h1 className="custom-heading">{children}</h1>
 *     ),
 *     link: ({ attrs, children }) => (
 *       <a href={attrs.href} className="custom-link">{children}</a>
 *     ),
 *   }}
 * />
 *
 * // With Storyblok component resolver
 * <RichTextRenderer
 *   doc={richTextData}
 *   blokResolver={(bloks) => (
 *     <>
 *       {bloks.map(blok => (
 *         <StoryblokComponent key={blok._uid} blok={blok} />
 *       ))}
 *     </>
 *   )}
 * />
 * ```
 */
export const RichTextRenderer: React.FC<ReactRichTextRendererProps> = ({
  doc,
  components = {},
  blokResolver,
}) => {
  const renderer = useMemo(() => new CoreRenderer(), []);

  const tree = useMemo(() => {
    return traverseDocument(doc, renderer, components, reactAdapter, {
      blokResolver: blokResolver
        ? (bloks, key) => (
            <React.Fragment key={key}>{blokResolver(bloks)}</React.Fragment>
          )
        : undefined,
    });
  }, [doc, renderer, components, blokResolver]);

  return <>{tree}</>;
};

export default RichTextRenderer;
