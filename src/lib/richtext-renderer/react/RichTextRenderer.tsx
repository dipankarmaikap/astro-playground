import React, { useMemo } from "react";
import type { Node as PMNode } from "@tiptap/pm/model";
import { CoreRenderer } from "../core/renderer";
import type {
  TiptapJSON,
  FrameworkComponentMap,
  NodeComponentProps,
  MarkComponentProps,
  MarkMapItem,
  ParsedDOMSpec,
} from "../core/types";

export interface ReactRichTextRendererProps {
  doc: TiptapJSON;
  components?: FrameworkComponentMap<React.ComponentType<any>>;
}

export type RichTextNodeProps<T extends string = string> =
  React.PropsWithChildren<NodeComponentProps<T>>;
export type RichTextMarkProps<T extends string = string> =
  React.PropsWithChildren<MarkComponentProps<T>>;

/**
 * Helper to dynamically render a DOM spec into a React element
 */
function renderDOMSpec(
  spec: ParsedDOMSpec | null,
  children: React.ReactNode,
  key?: string | number,
): React.ReactNode {
  if (!spec) return <>{children}</>;

  const props: Record<string, any> = { ...spec.attrs };
  if (key !== undefined) props.key = key;

  // Render class attributes safely in React
  if (props.class) {
    props.className = props.class;
    delete props.class;
  }

  if (spec.contents && typeof spec.contents !== "string") {
    return React.createElement(
      spec.tag,
      props,
      renderDOMSpec(spec.contents, children),
    );
  }

  // Self closing void elements in HTML
  const voidElements = new Set([
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ]);

  if (voidElements.has(spec.tag.toLowerCase())) {
    return React.createElement(spec.tag, props);
  }

  return React.createElement(spec.tag, props, children);
}

/**
 * Renders a sequence of Prosemirror marks around a generic ReactNode.
 */
function renderMarks(
  marks: MarkMapItem[],
  children: React.ReactNode,
  components: FrameworkComponentMap<React.ComponentType<any>>,
): React.ReactNode {
  return marks.reduceRight((acc, markDef, idx) => {
    const CustomMark = components[markDef.type as keyof typeof components];

    if (CustomMark) {
      return (
        <CustomMark
          key={`mark-${markDef.type}-${idx}`}
          mark={markDef.pmMark}
          attrs={markDef.attrs}
          parsedDOM={markDef.spec}
        >
          {acc}
        </CustomMark>
      );
    }

    return renderDOMSpec(markDef.spec, acc, `mark-${markDef.type}-${idx}`);
  }, children);
}

/**
 * Recursive node renderer
 */
function renderNode(
  node: PMNode,
  renderer: CoreRenderer,
  components: FrameworkComponentMap<React.ComponentType<any>>,
  index: number,
): React.ReactNode {
  // Map children recursively
  const children: React.ReactNode[] = [];
  node.forEach((childNode, offset, i) => {
    children.push(renderNode(childNode, renderer, components, i));
  });

  const domSpec = renderer.getNodeDOMSpec(node);
  const markDefs = renderer.getMarksForNode(node);

  let nodeElement: React.ReactNode;

  if (node.isText) {
    nodeElement = node.text;
  } else {
    const CustomNode = components[node.type.name as keyof typeof components];

    if (CustomNode) {
      nodeElement = (
        <CustomNode
          key={`node-${node.type.name}-${index}`}
          node={node}
          attrs={node.attrs}
          parsedDOM={domSpec}
        >
          {children.length > 0 ? children : null}
        </CustomNode>
      );
    } else {
      nodeElement = renderDOMSpec(
        domSpec,
        children.length > 0 ? children : null,
        `node-${node.type.name}-${index}`,
      );
    }
  }

  // Wrap node with its marks
  return renderMarks(markDefs, nodeElement, components);
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
