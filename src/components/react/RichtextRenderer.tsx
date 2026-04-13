import type { PMNode } from '@storyblok/richtext/static';
import RichTextNode from './RichTextNode';
import type { SBReactComponentMap } from '../../utils';

interface Props {
    document: PMNode;
    components?: SBReactComponentMap;
}
export default function RichtextRenderer({ document, components }: Props) {

    const nodes = document?.type === 'doc' ? document.content : document ? [document] : [];

    return (
        nodes?.length ? (
            nodes.map((node,i) => <RichTextNode key={i} node={node} components={components} />)
        ) : (
            <p>Not a valid Richtext Data</p>
        )
    )
}
