import { isSelfClosing, stringToStyle, type RenderSpec } from '@storyblok/richtext/static';
import type { ElementType, ReactNode } from 'react';

interface Props {
  staticChildren?: readonly RenderSpec[];
  attrs?: Record<string, any>;
  children?: ReactNode
}
export default function RichTextStatic({ staticChildren, attrs, children }:Props) {
  return staticChildren?.map((spec,i) =>{
    const Tag = spec.tag as ElementType;
    const selfClosing = isSelfClosing(Tag as string);
    const mergedAttrs = {
      ...spec.attrs, ...attrs,style:stringToStyle(spec?.attrs?.style??"",)
    }
    if (selfClosing) {
      return <Tag {...mergedAttrs} key={i} />;
    }
    return (
      <Tag key={i} {...mergedAttrs}>
        {spec.children ? (
          <RichTextStatic staticChildren={spec.children}>
            {children}
          </RichTextStatic>
        ) : 
          children
        }
      </Tag>
    );
  })
}
