<template>
  <component v-if="child" :is="child"></component>
  <!-- 不会显示此slot出口, 仅用于添加slot -->
  <slot v-else />
</template>

<script setup lang="ts">
import { assert, isObject } from "@shining-ui/utils";
import { Comment, computed, Fragment, h, onMounted, Text, VNode } from "vue";

const name = "SnSingleChild";

defineOptions({
  name,
});

const slots = defineSlots<{ default(): VNode[] }>();

const defaultSlot = slots.default();
const child = computed(() => findFirstLegitChild(defaultSlot));
console.log("child => ", child.value);

onMounted(() => {
  assert(defaultSlot?.length === 1, `${name} requires exact only one valid child.`);
});

function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
  if (!node) return null;
  const children = node as VNode[];
  for (const child of children) {
    /**
     * handle text Node
     */
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return wrapTextContent(child);
        case Fragment:
          return findFirstLegitChild(child.children as VNode[]);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}

function wrapTextContent(s: string | VNode) {
    return h('span', {}, s)
}
</script>
