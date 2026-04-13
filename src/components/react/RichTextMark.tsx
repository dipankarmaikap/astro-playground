import { processAttrs, resolveComponent, resolveTag, type PMMark } from "@storyblok/richtext/static";
import type { ElementType, ReactNode } from "react";
import type { SBReactComponentMap } from "../../utils";

interface Props {
    mark: PMMark;
    components?: SBReactComponentMap;
    children?: ReactNode

}
export default function RichTextMark({ mark, components, children }: Props) {
    const MarkComponent = resolveComponent(mark.type, components) as ElementType;

    if (MarkComponent) {
        return <MarkComponent {...mark}>{children}</MarkComponent>;
    }
    const Tag = resolveTag(mark) as ElementType
    const attrs = processAttrs(mark.type,mark.attrs)
    
    return (
        <Tag {...attrs}>
            {children}
        </Tag>
    )
}
