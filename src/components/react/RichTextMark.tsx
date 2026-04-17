import { processAttrs, resolveComponent, resolveTag, type PMMark } from "@storyblok/richtext/static";
import { createElement, type ComponentType, type ReactNode } from "react";
import { isValidReactComponent, type SBReactComponentMap } from "./utils";

interface Props {
    mark: PMMark;
    components?: SBReactComponentMap;
    children?: ReactNode;
}


export default function RichTextMark({ mark, components, children }: Props): ReactNode {
    // Type-safe component resolution with proper type guard
    const resolvedComponent = resolveComponent(mark.type, components);
    
    if (isValidReactComponent(resolvedComponent)) {
        const MarkComponent = resolvedComponent;
        return <MarkComponent {...mark}>{children}</MarkComponent>;
    }
    
    // Type-safe tag resolution - use createElement for dynamic tags
    const resolvedTag = resolveTag(mark);
    const tag = typeof resolvedTag === 'string' ? resolvedTag : 'span';
    const attrs = processAttrs(mark.type, mark.attrs);
    
    return createElement(tag, attrs, children);
}
