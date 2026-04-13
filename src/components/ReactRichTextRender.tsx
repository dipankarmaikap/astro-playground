import RichtextRenderer from "./react/RichtextRenderer"
import type { SBReactRichTextComponentProps } from "../utils"

interface Props {
    document: any
}
export default function ReactRichTextRender({ document }: Props) {
    return (
        <div>
            <RichtextRenderer document={document}
                components={{
                    link: CustomLink,
                    heading: Heading,
                    blok: BlokMapper
                }} />
        </div>
    )
}

type CustomLink = SBReactRichTextComponentProps<"link">
type CustomHeading = SBReactRichTextComponentProps<"heading">

function CustomLink({ attrs, children }: CustomLink) {
    return <span data-attrs={JSON.stringify(attrs)}>{children}</span>
}
function Heading({ attrs, content }: CustomHeading) {
    return <div data-attrs={JSON.stringify(attrs)}>
        {content?.map((document, index) => <RichtextRenderer key={index} document={document} />)}
    </div>
}
type CustomBlok = SBReactRichTextComponentProps<"blok">

function BlokMapper({ attrs }: CustomBlok) {
    return <pre style={
        {
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
        }
    }>{JSON.stringify(attrs, null, 2)}</pre>
}
