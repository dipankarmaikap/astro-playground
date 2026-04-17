import type { StoryblokRichTextJson } from '@storyblok/richtext/static';
import RichTextNode from './RichTextNode';
import type { ReactNode } from 'react';
import type { SBReactComponentMap } from './utils';

interface Props {
    document: StoryblokRichTextJson;
    components?: SBReactComponentMap;
}

export default function RichtextRenderer({ document, components }: Props): ReactNode {
    const nodes = document.type === 'doc' ? document.content ?? [] : [document];

    return nodes.length ? (
        nodes.map((node, i) => <RichTextNode key={i} node={node} components={components} />)
    ) : (
        <p>Not a valid Richtext Data</p>
    );
}
