import { getSchema } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { Node as PMNode } from '@tiptap/pm/model';

const extensions = [StarterKit];
const schema = getSchema(extensions);

const docJson = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [
        { type: 'text', text: 'Hello ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'bold' },
        { type: 'text', text: ' world' }
      ]
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'This is a test.' }
      ]
    }
  ]
};

const docNode = PMNode.fromJSON(schema, docJson);

function parseDOMSpec(spec: any): any {
  if (typeof spec === 'string') {
    return { tag: spec, attrs: {}, hasHole: false, contents: null };
  }
  
  if (Array.isArray(spec)) {
    const tag = spec[0];
    let attrs = {};
    let contentIdx = 1;
    
    if (spec.length > 1 && typeof spec[1] === 'object' && spec[1] !== null && !Array.isArray(spec[1]) && !spec[1]?.nodeType && typeof spec[1] !== 'number') {
      attrs = spec[1];
      contentIdx = 2;
    }

    let hasHole = false;
    let contents = null;

    if (spec[contentIdx] === 0) {
      hasHole = true;
    } else if (spec[contentIdx] !== undefined) {
      if (Array.isArray(spec[contentIdx])) {
        // Nested dom spec (e.g. ['code', ['span', 0]])
        contents = parseDOMSpec(spec[contentIdx]);
      } else {
         contents = spec[contentIdx]; // Text content maybe
      }
    }

    return { tag, attrs, hasHole, contents };
  }
  
  return null;
}

docNode.descendants((node) => {
  console.log('Node:', node.type.name);
  if (node.isText) return; // text has no toDOM typically
  const spec = node.type.spec.toDOM ? node.type.spec.toDOM(node) : null;
  console.log('  toDOM:', JSON.stringify(spec));
  console.log('  Parsed:', JSON.stringify(parseDOMSpec(spec)));
  
  if (node.marks) {
    node.marks.forEach(mark => {
      console.log('  Mark:', mark.type.name);
      const markSpec = mark.type.spec.toDOM ? mark.type.spec.toDOM(mark, false) : null;
      console.log('    toDOM:', JSON.stringify(markSpec));
      console.log('    Parsed:', JSON.stringify(parseDOMSpec(markSpec)));
    });
  }
});
