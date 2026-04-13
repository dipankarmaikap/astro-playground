import type { PMNode } from "@storyblok/richtext/static";
import RichTextMark from "./RichTextMark";
import { Fragment } from "react";
import type { SBReactComponentMap } from "../../utils";

interface Props {
    node: PMNode;
    components?: SBReactComponentMap;
}
export default function RichTextText({ node, components = {} }: Props) {
    if (node.type !== 'text') {
        return null;
    }
    const marks = node.marks ?? [];
    return marks.reduce(
        (acc, mark) => (
            <RichTextMark mark={mark} components={components}>
                {acc}
            </RichTextMark>
        ),
        <Fragment>{node.text}</Fragment>,
    )
}
