/**
 * react/attrs.ts — React-specific attribute normalisation.
 *
 * Re-exports the shared core utilities and adds the HTML→React prop
 * rename map (e.g. `class → className`, `colspan → colSpan`).
 */
export { normalizeDOMAttrs, convertStyleString, CSS_AS_STYLE_ATTRS } from "../core/attrs";

/**
 * HTML attribute names that React requires to be written as camelCase props.
 * Passed to `normalizeDOMAttrs` as the `renameMap` argument.
 */
export const REACT_ATTR_RENAME: Record<string, string> = {
  class: "className",
  colspan: "colSpan",
  rowspan: "rowSpan",
  tabindex: "tabIndex",
  contenteditable: "contentEditable",
  crossorigin: "crossOrigin",
  datetime: "dateTime",
  htmlfor: "htmlFor",
  accesskey: "accessKey",
  maxlength: "maxLength",
  minlength: "minLength",
  readonly: "readOnly",
  enctype: "encType",
  usemap: "useMap",
  inputmode: "inputMode",
  autocomplete: "autoComplete",
  autoplay: "autoPlay",
  autofocus: "autoFocus",
};
