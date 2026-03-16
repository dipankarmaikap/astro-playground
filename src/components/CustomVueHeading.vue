<script setup lang="ts">
import type { RichTextComponentProps } from "../lib/richtext-renderer/vue/types";

const props = defineProps<RichTextComponentProps<"heading">>();
</script>

<template>
  <component
    :is="`h${props.attrs.level}`"
    :class="`text-green-600 border-b-2 border-green-200 pb-2 mb-4 mt-8 level-${props.attrs.level}`"
  >
    <slot />
  </component>
</template>

