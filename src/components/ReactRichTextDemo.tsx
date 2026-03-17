import { RichTextRenderer } from "../lib/richtext-renderer/react/RichTextRenderer";
import type { RichTextComponentProps } from "../lib/richtext-renderer/react/types";

import { sampleDoc as doc } from "../data/sampleDoc";

// Typed Component Overrides
const CustomHeading = ({
  children,
  attrs,
}: RichTextComponentProps<"heading">) => {
  const Tag = `h${attrs.level ?? 2}` as any;
  return (
    <Tag
      className={`text-orange-600 border-b-2 border-orange-200 pb-2 mb-4 mt-8 level-${attrs.level}`}
    >
      {children}
    </Tag>
  );
};

const CustomBold = ({ children }: RichTextComponentProps<"bold">) => {
  return (
    <strong className="font-black text-rose-500 bg-rose-50 px-1 rounded">
      {children}
    </strong>
  );
};

// Typescript ensures `href` exists on Link attrs when casting Custom Props
const CustomLink = ({
  attrs,
  children,
}: RichTextComponentProps<"link">) => {
  return (
    <a
      href={attrs.href || "#"}
      target={attrs.target ?? undefined}
      className="text-blue-500 underline decoration-wavy"
    >
      {children}
    </a>
  );
};

export default function ReactDemo() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <RichTextRenderer
        doc={doc}
        components={{
          heading: CustomHeading,
          bold: CustomBold,
          link: CustomLink,
        }}
        blokResolver={(props)=> {
console.log({props});

          return <p>This is blok resolver</p>
        }}
      />
    </div>
  );
}
