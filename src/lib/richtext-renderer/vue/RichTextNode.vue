<script setup lang="ts">
/**
 * RichTextNode.vue — renders a single ProseMirror node recursively.
 *
 * - Text nodes render as raw text.
 * - Nodes with marks are wrapped via <MarkWrapper>.
 * - Nodes with a CustomNode component use that component (with children as slot).
 * - Fallback nodes use <RenderDOMSpec> which applies the Tiptap toDOM() spec.
 */
import { computed } from "vue";
import type { Node as PMNode } from "@tiptap/pm/model";
import type { CoreRenderer } from "../core/renderer";
import type { BlokBody } from "../core/types";
import type { ComponentMap } from "./types";
import MarkWrapper from "./MarkWrapper.vue";
import RenderDOMSpec from "./RenderDOMSpec.vue";

const props = defineProps<{
  node: PMNode;
  renderer: CoreRenderer;
  components: ComponentMap;
  index: number;
  isMarkWrapped?: boolean;
  blokResolver?: (bloks: BlokBody[]) => any;
}>();

const domSpec = computed(() => props.renderer.getNodeDOMSpec(props.node));
const markDefs = computed(() => props.renderer.getMarksForNode(props.node));

const CustomNode = computed(
  () => props.components[props.node.type.name as keyof ComponentMap] as any,
);

// Props passed to custom node components, including parsedDOM
const nodeProps = computed(() => ({
  node: props.node,
  attrs: props.node.attrs,
  parsedDOM: domSpec.value,
}));

// Check if this is a blok node
const isBlokNode = computed(() => props.node.type.name === "blok");
const blokBody = computed(() => (props.node.attrs.body || []) as BlokBody[]);

// Collect ProseMirror child nodes
const childNodes = computed(() => {
  const result: { node: PMNode; index: number }[] = [];
  props.node.forEach((child, _, i) => result.push({ node: child, index: i }));
  return result;
});
</script>

<template>
  <!-- Wrap with marks first, unless we're already inside a MarkWrapper -->
  <MarkWrapper
    v-if="!isMarkWrapped && markDefs.length > 0"
    :node="node"
    :renderer="renderer"
    :components="components"
    :marks="markDefs"
    :index="index"
    :blok-resolver="blokResolver"
  />

  <template v-else>
    <!-- Plain text node -->
    <template v-if="node.isText">{{ node.text }}</template>

    <!-- Blok node with resolver -->
    <template v-else-if="isBlokNode && blokResolver">
      <component :is="blokResolver(blokBody)" />
    </template>

    <!-- Custom component for this node type -->
    <component
      v-else-if="CustomNode"
      :is="CustomNode"
      v-bind="nodeProps"
    >
      <RichTextNode
        v-for="child in childNodes"
        :key="child.index"
        :node="child.node"
        :renderer="renderer"
        :components="components"
        :index="child.index"
        :blok-resolver="blokResolver"
      />
    </component>

    <!-- Default: render using Tiptap's toDOM spec with children in the hole -->
    <RenderDOMSpec
      v-else-if="domSpec"
      :spec="domSpec"
    >
      <RichTextNode
        v-for="child in childNodes"
        :key="child.index"
        :node="child.node"
        :renderer="renderer"
        :components="components"
        :index="child.index"
        :blok-resolver="blokResolver"
      />
    </RenderDOMSpec>

    <!-- No domSpec - render children directly (e.g. document root) -->
    <template v-else>
      <RichTextNode
        v-for="child in childNodes"
        :key="child.index"
        :node="child.node"
        :renderer="renderer"
        :components="components"
        :index="child.index"
        :blok-resolver="blokResolver"
      />
    </template>
  </template>
</template>
