<script setup lang="ts">
import { computed } from "vue";
import type { RichTextComponentProps } from "../lib/richtext-renderer/vue/types";

const props = defineProps<RichTextComponentProps<"link">>();

const href = computed(() => props.attrs.href ?? "#");
const target = computed(() => props.attrs.target ?? "_self");
</script>

<template>
  <a
    :href="href"
    :target="target"
    class="text-emerald-600 underline underline-offset-2 hover:text-emerald-800 transition-colors"
    rel="noopener noreferrer"
  >
    <slot />
  </a>
</template>
