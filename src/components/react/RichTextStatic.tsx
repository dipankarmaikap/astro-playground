import { isSelfClosing, stringToStyle, type RenderSpec } from '@storyblok/richtext/static';
import { createElement, type ReactNode } from 'react';

interface Props {
  staticChildren?: readonly RenderSpec[];
  attrs?: Record<string, unknown>;
  children?: ReactNode;
}

export default function RichTextStatic({ staticChildren, attrs, children }: Props): ReactNode {
  return staticChildren?.map((spec, i) => {
    // Type-safe tag resolution
    const tag = spec.tag
    if (!tag) {
      return null;
    }
    const selfClosing = isSelfClosing(tag);
    const mergedAttrs = {
      ...spec.attrs,
      ...attrs,
      style: stringToStyle(spec?.attrs?.style ?? ""),
      key: i,
    };
    
    if (selfClosing) {
      return createElement(tag, mergedAttrs);
    }
    
    const childContent = spec.children ? (
      <RichTextStatic staticChildren={spec.children}>
        {children}
      </RichTextStatic>
    ) : children;
    
    return createElement(tag, mergedAttrs, childContent);
  });
}
