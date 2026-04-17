import type { PMNode } from "@storyblok/richtext/static";
import RichTextMark from "./RichTextMark";
import { Fragment, type ReactNode } from "react";
import { type SBReactComponentMap } from "./utils"; 

interface Props {
    node: PMNode & { type: 'text' };
    components?: SBReactComponentMap;
}

export default function RichTextText({ node, components = {} }: Props): ReactNode {
    const marks = node.marks ?? [];
    return marks.reduce<ReactNode>(
        (acc, mark) => (
            <RichTextMark mark={mark} components={components}>
                {acc}
            </RichTextMark>
        ),
        <Fragment>{node.text}</Fragment>,
    );
}
