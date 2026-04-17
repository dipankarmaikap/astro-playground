import RichtextRenderer from "./react/RichtextRenderer"
import type { StoryblokRichTextJson } from "@storyblok/richtext/static"
import type { ReactNode } from "react"
import type { SBReactRichTextComponentProps } from "./react/utils";

interface Props {
    document: StoryblokRichTextJson;
}

// Type-safe custom component definitions using SBReactRichTextComponentProps
function CustomLink({ attrs, children }: SBReactRichTextComponentProps<"link">): ReactNode {
    return <span data-attrs={JSON.stringify(attrs)}>{children}</span>;
}

function Heading({ attrs, content, components }: SBReactRichTextComponentProps<"heading">): ReactNode {    
    return (
        <div data-attrs={JSON.stringify(attrs)}>
            {content?.map((document, index) => (
                <RichtextRenderer key={index} document={document} components={components} />
            ))}
        </div>
    );
}

function BlokMapper({ attrs }: SBReactRichTextComponentProps<"blok">): ReactNode {
    return (
        <pre style={{
            width: 400,
            maxWidth: '100%',
            maxHeight: 200,
            overflow: 'auto',
            padding: 12,
            borderRadius: 6,
            background: '#0f172a',
            color: '#e2e8f0',
            fontSize: 12,
            lineHeight: 1.4,
            border: '1px solid #1e293b',
            display: 'inline-block',
        }}>
            {JSON.stringify(attrs, null, 2)}
        </pre>
    );
}

export default function ReactRichTextRender({ document }: Props): ReactNode {
    return (
        <div>
            <RichtextRenderer
                document={document}
                components={{
                    link: CustomLink,
                    heading: Heading,
                    blok: BlokMapper,
                }}
            />
        </div>
    );
}
