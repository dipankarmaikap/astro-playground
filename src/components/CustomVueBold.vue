<script setup lang="ts">
import type { RichTextComponentProps } from "../lib/richtext-renderer/vue/types";

defineProps<RichTextComponentProps<"bold">>();
</script>

<template>
  <strong class="font-black text-emerald-600 bg-emerald-50 px-1 rounded">
    <slot />
  </strong>
</template>

