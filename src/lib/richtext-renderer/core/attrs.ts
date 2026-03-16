/**
 * core/attrs.ts — Framework-agnostic HTML attribute normalisation utilities.
 *
 * These are used by every framework adapter when converting Tiptap's `toDOM()`
 * attribute objects into something each framework can safely consume.
 */

/**
 * CSS-flavoured properties that Tiptap extensions (e.g. TableCell) sometimes
 * emit as top-level DOM attributes instead of inside a `style` string.
 * Adapters should move these into an inline style object.
 */
export const CSS_AS_STYLE_ATTRS = new Set([
  "backgroundcolor",
  "background-color",
  "color",
  "fontsize",
  "font-size",
  "fontweight",
  "font-weight",
  "textalign",
  "text-align",
]);

/**
 * Converts a CSS style string (e.g. `"color: red; font-size: 12px;"`)
 * into a camelCase object suitable for use as an inline style.
 *
 * @example
 * convertStyleString("font-size: 14px; margin-top: 8px")
 * // → { fontSize: "14px", marginTop: "8px" }
 */
export function convertStyleString(styleStr: string): Record<string, string> {
  if (typeof styleStr !== "string") return {};
  const result: Record<string, string> = {};
  styleStr.split(";").forEach((rule) => {
    const colonIdx = rule.indexOf(":");
    if (colonIdx === -1) return;
    const key = rule.slice(0, colonIdx).trim();
    const value = rule.slice(colonIdx + 1).trim();
    if (key && value) {
      const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      result[camelKey] = value;
    }
  });
  return result;
}

/**
 * Normalises raw HTML attributes from Tiptap's `toDOM()` into a clean object.
 *
 * - Strips `null` / `undefined` values
 * - Converts CSS string `style` into an object via `convertStyleString`
 * - Moves known CSS-as-DOM-attrs (e.g. `backgroundColor`) into `style`
 * - Optionally renames attribute keys via `renameMap` (e.g. React needs `class → className`)
 *
 * @param rawAttrs - The raw attrs from `ParsedDOMSpec.attrs`
 * @param renameMap - Optional map of `lowerCaseHtmlAttr → frameworkAttrName`
 */
export function normalizeDOMAttrs(
  rawAttrs: Record<string, any>,
  renameMap: Record<string, string> = {},
): Record<string, any> {
  const props: Record<string, any> = {};
  const styleExtras: Record<string, string> = {};

  for (const [key, value] of Object.entries(rawAttrs)) {
    if (value === null || value === undefined) continue;

    const lowerKey = key.toLowerCase();

    // Apply framework-specific rename (e.g. class → className for React)
    if (renameMap[lowerKey]) {
      props[renameMap[lowerKey]] = value;
      continue;
    }

    // Pull CSS-flavoured DOM attrs into styleExtras
    if (CSS_AS_STYLE_ATTRS.has(lowerKey)) {
      const camelKey = lowerKey.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      styleExtras[camelKey] = String(value);
      continue;
    }

    props[key] = value;
  }

  // Merge existing style string/object with any extracted CSS values
  const existingStyle =
    props.style && typeof props.style === "string"
      ? convertStyleString(props.style)
      : props.style ?? {};

  if (Object.keys(styleExtras).length > 0 || Object.keys(existingStyle).length > 0) {
    props.style = { ...existingStyle, ...styleExtras };
  }

  return props;
}
