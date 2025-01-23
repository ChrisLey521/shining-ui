<script setup lang="ts">
import { t } from '@/locales'
import { computed } from 'vue'
import { useLang } from '../../composables/lang'

defineProps({
  type: String,
  details: String,
})

const lang = useLang()
const detail = computed(() => t('detail', lang.value))
</script>

<template>
  <span class="inline-flex items-center">
    <code class="api-typing mr-1">
      {{ type }}
    </code>
    <ClientOnly>
      <SnTooltip v-if="details" effect="light" trigger="click">
        <SnButton
          text
          icon="warning"
          :aria-label="detail"
          class="p-2 text-4"
        />
        <template #content>
          <slot>
            <div class="m-1" style="max-width: 600px">
              <code
                style="
                  color: var(--code-tooltip-color);
                  background-color: var(--code-tooltip-bg-color);
                "
              >
                {{ details }}
              </code>
            </div>
          </slot>
        </template>
      </SnTooltip>
    </ClientOnly>
  </span>
</template>