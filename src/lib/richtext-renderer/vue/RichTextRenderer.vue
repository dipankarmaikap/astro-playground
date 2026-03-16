<script setup lang="ts">
/**
 * RichTextRenderer.vue — entry point for the Vue rich-text renderer.
 *
 * Accepts a Tiptap/ProseMirror JSON document and an optional component map,
 * then renders each top-level node via NodeIter.
 */
import { computed } from "vue";
import type { JSONContent } from "@tiptap/core";
import { CoreRenderer } from "../core/renderer";
import type { ComponentMap } from "./types";
import RichTextNode from "./RichTextNode.vue";

const props = defineProps<{
  doc: JSONContent;
  components?: ComponentMap;
}>();

// CoreRenderer is stable for the lifetime of this component
const renderer = new CoreRenderer();

// Re-derived whenever `doc` changes
const topLevelNodes = computed(() => {
  const pmDoc = renderer.parseDocument(props.doc);
  const nodes: { node: any; index: number }[] = [];
  pmDoc.forEach((node, _, i) => nodes.push({ node, index: i }));
  return nodes;
});
</script>

<template>
  <RichTextNode
    v-for="{ node, index } in topLevelNodes"
    :key="index"
    :node="node"
    :renderer="renderer"
    :components="components ?? {}"
    :index="index"
  />
</template>
