import { 
    isSelfClosing, 
    resolveTag, 
    getStaticChildren, 
    processAttrs, 
    resolveComponent, 
    type PMNode 
} from "@storyblok/richtext/static";
import RichTextText from "./RichTextText";
import RichTextStatic from "./RichTextStatic";
import { createElement, type ReactNode } from "react";
import { isValidReactComponent, type SBReactComponentMap } from "./utils";

interface Props {
    node: PMNode;
    components?: SBReactComponentMap;
}

export default function RichTextNode({ node, components = {} }: Props): ReactNode {

    if (node.type === 'text') {
        return <RichTextText node={node} components={components} />
    }

    // Type-safe component resolution with proper type guard
    const resolvedComponent = resolveComponent(node.type, components);
    if (isValidReactComponent(resolvedComponent)) {
        const NodeComponent = resolvedComponent;
        return <NodeComponent {...node} components={components} />
    }

    const attrs = processAttrs(node.type, node.attrs, {
        class: "className"
    });

    // Type-safe tag resolution - use createElement for dynamic tags
    const tag = resolveTag(node);

    if (!tag) {
       return null 
    }
    
    const selfClosing = isSelfClosing(tag);
    if (selfClosing) {
        return createElement(tag, attrs);
    }
    
    const staticChildren = getStaticChildren(node);
    const children = node.content?.map((childNode, i) => (
        <RichTextNode key={i} node={childNode} components={components} />
    ));
    
    if (staticChildren) {
        return createElement(
            tag, 
            null,
            <RichTextStatic attrs={attrs} staticChildren={staticChildren}>
                {children}
            </RichTextStatic>
        );
    }
    
    return createElement(tag, attrs, children);
}
