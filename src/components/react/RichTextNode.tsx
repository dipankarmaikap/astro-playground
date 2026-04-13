import { isSelfClosing, resolveTag, type PMNode , getStaticChildren, processAttrs, resolveComponent} from "@storyblok/richtext/static";
import RichTextText from "./RichTextText";
import RichTextStatic from "./RichTextStatic";
import type { ElementType } from "react";
import { type SBReactComponentMap } from "../../utils";

interface Props {
    node: PMNode;
    components?: SBReactComponentMap;
}

export default function RichTextNode({ node, components = {} }: Props) {

    if (node.type === 'text') {
        return <RichTextText node={node} components={components} />
    }
    const NodeComponent = resolveComponent(node.type, components) as ElementType

    if (NodeComponent) {
        return <NodeComponent {...node} components={components} />
    }

    const attrs = processAttrs(node.type,node.attrs,{
        class: "className"
    })

    const Tag = resolveTag(node) as ElementType;
    const selfClosing = isSelfClosing(Tag as string)
    if (selfClosing) {
        return <Tag {...attrs} />
    }
    const staticChildren = getStaticChildren(node);
    const children = node.content?.map((childNode, i) => (
        <RichTextNode key={i} node={childNode} components={components} />
    ));
    return (
        <Tag {...(!staticChildren && attrs)}>
            {staticChildren ? (
                <RichTextStatic attrs={attrs} staticChildren={staticChildren}>
                    {children}
                </RichTextStatic>
            ) : (
                children
            )}
        </Tag>
    )
}
