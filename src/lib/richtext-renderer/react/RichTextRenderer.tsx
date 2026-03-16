import React, { useMemo } from "react";
import type { Node as PMNode } from "@tiptap/pm/model";
import type { JSONContent } from "@tiptap/core";
import { CoreRenderer } from "../core/renderer";
import type { MarkMapItem, ParsedDOMSpec } from "../core/types";
import type { ComponentMap, RichTextComponentProps } from "./types";
import { VOID_ELEMENTS } from "../core/renderer";
import { normalizeDOMAttrs } from "../core/attrs";
import { REACT_ATTR_RENAME } from "./attrs";

export interface ReactRichTextRendererProps {
  doc: JSONContent;
  components?: ComponentMap;
}

// Re-export for standardizing Custom Component Authoring
export type { RichTextComponentProps };

/** Normalises raw Tiptap toDOM() attrs for React (renames + style merging). */
function normalizeAttrsForReact(rawAttrs: Record<string, any>): Record<string, any> {
  return normalizeDOMAttrs(rawAttrs, REACT_ATTR_RENAME);
}

/**
 * Helper to dynamically render a DOM spec into a React element
 */
function renderDOMSpec(
  spec: ParsedDOMSpec | null,
  children: React.ReactNode,
  key?: string | number,
): React.ReactNode {
  if (!spec) {
    return key !== undefined ? (
      <React.Fragment key={key}>{children}</React.Fragment>
    ) : (
      <>{children}</>
    );
  }

  const props = normalizeAttrsForReact(spec.attrs);
  if (key !== undefined) props.key = key;

  const reactChildren = spec.children.map((child, i) => {
    if (typeof child === "string") return child;
    if ("hole" in child && child.hole) {
      return <React.Fragment key={`hole-${i}`}>{children}</React.Fragment>;
    }
    return renderDOMSpec(child as ParsedDOMSpec, children, `child-${i}`);
  });

  if (VOID_ELEMENTS.has(spec.tag.toLowerCase())) {
    return React.createElement(spec.tag, props);
  }

  return React.createElement(
    spec.tag,
    props,
    reactChildren.length > 0 ? reactChildren : null,
  );
}

/**
 * Renders a sequence of Prosemirror marks around a generic ReactNode.
 */
function renderMarks(
  marks: MarkMapItem[],
  children: React.ReactNode,
  components: ComponentMap,
  nodeKey: string,
): React.ReactNode {
  return marks.reduceRight((acc, markDef, idx) => {
    const CustomMark = components[markDef.type as keyof typeof components] as React.ElementType<any> | undefined;

    if (CustomMark) {
      return (
        <CustomMark
          key={`mark-${markDef.type}-${nodeKey}-${idx}`}
          mark={markDef.pmMark}
          attrs={markDef.attrs}
        >
          {acc}
        </CustomMark>
      );
    }

    return renderDOMSpec(markDef.spec, acc, `mark-${markDef.type}-${nodeKey}-${idx}`);
  }, children);
}

/**
 * Recursive node renderer
 */
function renderNode(
  node: PMNode,
  renderer: CoreRenderer,
  components: ComponentMap,
  index: number,
  keyPath: string = "root",
): React.ReactNode {
  const activeKey = `${keyPath}-${index}`;

  // Map children recursively
  const children: React.ReactNode[] = [];
  node.forEach((childNode, offset, i) => {
    children.push(renderNode(childNode, renderer, components, i, activeKey));
  });

  const domSpec = renderer.getNodeDOMSpec(node);
  const markDefs = renderer.getMarksForNode(node);

  let nodeElement: React.ReactNode;

  if (node.isText) {
    nodeElement = <React.Fragment key={activeKey}>{node.text}</React.Fragment>;
  } else {
    const CustomNode = components[node.type.name as keyof typeof components] as React.ElementType<any> | undefined;

    if (CustomNode) {
      nodeElement = (
        <CustomNode
          key={`node-${node.type.name}-${activeKey}`}
          node={node}
          attrs={node.attrs}
        >
          {children.length > 0 ? children : null}
        </CustomNode>
      );
    } else {
      nodeElement = renderDOMSpec(
        domSpec,
        children.length > 0 ? children : null,
        `node-${node.type.name}-${activeKey}`,
      );
    }
  }

  // Wrap node with its marks
  return renderMarks(markDefs, nodeElement, components, activeKey);
}

export const RichTextRenderer: React.FC<ReactRichTextRendererProps> = ({
  doc,
  components = {},
}) => {
  const { renderer, pmDoc } = useMemo(() => {
    const core = new CoreRenderer();
    return {
      renderer: core,
      pmDoc: core.parseDocument(doc),
    };
  }, [doc]);

  const tree = useMemo(() => {
    const result: React.ReactNode[] = [];
    pmDoc.forEach((childNode, _offset, index) => {
      result.push(renderNode(childNode, renderer, components, index));
    });
    return result;
  }, [pmDoc, renderer, components]);

  return <>{tree}</>;
};

export default RichTextRenderer;
