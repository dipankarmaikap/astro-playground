import type { ParsedDOMSpec } from './types';

/**
 * Parses a ProseMirror DOMOutputSpec into a structured `{ tag, attrs, hasHole, contents }` object.
 * 
 * ProseMirror's `toDOM` usually returns formats like:
 * - "p"
 * - ["div", { class: "custom" }, 0]
 * - ["code", ["span", 0]]
 */
export function parseDOMSpec(spec: any): ParsedDOMSpec | null {
  if (typeof spec === 'string') {
    return { tag: spec, attrs: {}, hasHole: false, contents: null };
  }
  
  if (Array.isArray(spec)) {
    const tag = spec[0];
    let attrs: Record<string, string> = {};
    let contentIdx = 1;
    
    // Check if the second element is an attributes object
    if (
      spec.length > 1 && 
      typeof spec[1] === 'object' && 
      spec[1] !== null && 
      !Array.isArray(spec[1]) && 
      !spec[1]?.nodeType && 
      typeof spec[1] !== 'number'
    ) {
      attrs = spec[1];
      contentIdx = 2;
    }

    let hasHole = false;
    let contents: ParsedDOMSpec | string | null = null;

    if (spec[contentIdx] === 0) {
      hasHole = true;
    } else if (spec[contentIdx] !== undefined) {
      if (Array.isArray(spec[contentIdx])) {
        // Nested DOM spec (e.g. ['code', ['span', 0]])
        contents = parseDOMSpec(spec[contentIdx]) as ParsedDOMSpec;
      } else if (typeof spec[contentIdx] === 'string') {
         contents = spec[contentIdx]; // Text content maybe
      }
    }

    return { tag, attrs, hasHole, contents };
  }
  
  return null;
}
