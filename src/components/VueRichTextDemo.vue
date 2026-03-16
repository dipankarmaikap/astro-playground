<script setup lang="ts">
import RichTextRenderer from "../lib/richtext-renderer/vue/RichTextRenderer.vue";
import CustomVueHeading from "./CustomVueHeading.vue";
import CustomVueBold from "./CustomVueBold.vue";
import CustomVueLink from "./CustomVueLink.vue";
import { sampleDoc } from "../data/sampleDoc";
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md border border-gray-200 prose prose-emerald max-w-none">
    <RichTextRenderer
      :doc="sampleDoc"
      :components="{
        heading: CustomVueHeading,
        bold: CustomVueBold,
        link: CustomVueLink,
      }"
    />
  </div>
</template>
