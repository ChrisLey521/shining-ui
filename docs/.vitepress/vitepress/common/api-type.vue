<script setup lang="ts">
import { Tag } from 'components';
import { useData } from 'vitepress';
import { computed, h } from 'vue';

defineProps({
  type: String,
  details: String,
})

const { isDark } = useData()

const size = computed(() => window.innerWidth > 640
  ? 'medium'
  : 'mini'
)
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
          }, details),
          theme: isDark ? 'dark' : 'light',
          trigger: 'click',
          contentAsComponent: true
        }"
        :size
        ghost
        circle
        icon="warning"
        class="!p-0 sm:p-1 text-4"
      />
    </ClientOnly>
  </span>
</template>