<script setup lang="ts">
/**
 * MarkWrapper.vue — recursively wraps the node with its ProseMirror marks.
 *
 * Takes the first mark, wraps content with it (using a CustomMark component
 * or the default DOMSpec tag), then recurses for remaining marks.
 */
import type { Node as PMNode } from "@tiptap/pm/model";
import type { CoreRenderer } from "../core/renderer";
import type { MarkMapItem } from "../core/types";
import type { ComponentMap } from "./types";
import RenderDOMSpec from "./RenderDOMSpec.vue";
import RichTextNode from "./RichTextNode.vue";

const props = defineProps<{
  node: PMNode;
  renderer: CoreRenderer;
  components: ComponentMap;
  marks: MarkMapItem[];
  index: number;
}>();

const currentMark = props.marks[0];
const remainingMarks = props.marks.slice(1);

const CustomMark = props.components[currentMark.type as keyof ComponentMap] as any;
const markProps = {
  mark: currentMark.pmMark,
  attrs: currentMark.attrs,
};
</script>

<template>
  <!-- Render using CustomMark component if provided -->
  <component
    v-if="CustomMark"
    :is="CustomMark"
    v-bind="markProps"
  >
    <!-- More marks to wrap → recurse into MarkWrapper -->
    <MarkWrapper
      v-if="remainingMarks.length > 0"
      :node="node"
      :renderer="renderer"
      :components="components"
      :marks="remainingMarks"
      :index="index"
    />
    <!-- No more marks → render the node content -->
    <RichTextNode
      v-else
      :node="node"
      :renderer="renderer"
      :components="components"
      :index="index"
      :is-mark-wrapped="true"
    />
  </component>

  <!-- No custom mark — use the default DOMSpec wrapper -->
  <RenderDOMSpec
    v-else-if="currentMark.spec"
    :spec="currentMark.spec"
  >
    <MarkWrapper
      v-if="remainingMarks.length > 0"
      :node="node"
      :renderer="renderer"
      :components="components"
      :marks="remainingMarks"
      :index="index"
    />
    <RichTextNode
      v-else
      :node="node"
      :renderer="renderer"
      :components="components"
      :index="index"
      :is-mark-wrapped="true"
    />
  </RenderDOMSpec>

  <!-- Fallback: no spec at all, just pass through -->
  <template v-else>
    <MarkWrapper
      v-if="remainingMarks.length > 0"
      :node="node"
      :renderer="renderer"
      :components="components"
      :marks="remainingMarks"
      :index="index"
    />
    <RichTextNode
      v-else
      :node="node"
      :renderer="renderer"
      :components="components"
      :index="index"
      :is-mark-wrapped="true"
    />
  </template>
</template>
