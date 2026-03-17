<script setup lang="ts">
/**
 * RenderDOMSpec.vue — recursively renders a ParsedDOMSpec tree.
 *
 * Children of the spec are rendered in order. When a "hole" is encountered,
 * the parent's slotted content is injected via <slot />.
 */
import type { ParsedDOMSpec } from "../core/types";
import { VOID_ELEMENTS } from "../core/renderer";
import { normalizeDOMAttrs } from '../core/attrs';

const props = defineProps<{ spec: ParsedDOMSpec }>();

// Normalize attributes so "color" etc. become <style> inline
const normalizedAttrs = normalizeDOMAttrs(props.spec.attrs);

const isVoid = VOID_ELEMENTS.has(props.spec.tag.toLowerCase());
</script>

<template>
  <component :is="spec.tag" v-bind="normalizedAttrs">
    <template v-if="!isVoid">
      <template v-for="(child, i) in spec.children" :key="i">
        <!-- Hole: inject slotted content from parent (the actual ProseMirror children) -->
        <slot v-if="typeof child === 'object' && 'hole' in child" />
        <!-- Nested DOM spec: recurse, passing the slot down so the hole still gets filled -->
        <RenderDOMSpec
          v-else-if="typeof child === 'object'"
          :spec="child as ParsedDOMSpec"
        >
          <slot />
        </RenderDOMSpec>
        <!-- Plain text fragment -->
        <template v-else>{{ child }}</template>
      </template>
    </template>
  </component>
</template>
