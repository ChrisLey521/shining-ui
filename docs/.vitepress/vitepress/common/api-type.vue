<script setup lang="ts">
import { Tag } from 'components';
import { useData } from 'vitepress';
import { h } from 'vue';

defineProps({
  type: String,
  details: String,
})

const { isDark } = useData()

</script>

<template>
  <span class="inline-flex items-center">
    <code class="api-typing mr-1">
      {{ type }}
    </code>
    <ClientOnly>
      <sn-button
        v-tooltip="{
          content: h(Tag, {
            background: 'var(--vp-code-bg)',
            color: 'var(--vp-code-color)',
            border: 'none',
            size: 'small'
          }, details),
          theme: isDark ? 'dark' : 'light',
          trigger: 'click',
          contentAsComponent: true
        }"
        text
        circle
        icon="warning"
        class="p-2 text-4"
      />
    </ClientOnly>
  </span>
</template>