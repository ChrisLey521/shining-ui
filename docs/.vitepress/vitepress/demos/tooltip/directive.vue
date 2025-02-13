<template>
    <div
        grid
        grid-cols-2
        sm:grid-cols-3
        gap-2
    >
        <sn-button v-tooltip="{ placement: 'top-start' }">TopStart</sn-button>
        <sn-button v-tooltip="{ placement: 'top' }">Top</sn-button>
        <sn-button v-tooltip="{ placement: 'top-end' }">TopEnd</sn-button>
        <sn-button v-tooltip="{ placement: 'bottom-start' }" variant="primary">BottomStart</sn-button>
        <sn-button v-tooltip="{ placement: 'bottom' }" variant="primary">Bottom</sn-button>
        <sn-button v-tooltip="{ placement: 'bottom-end' }" variant="primary">BottomEnd</sn-button>
        <sn-button v-tooltip="{ placement: 'left-start' }" variant="success">LeftStart</sn-button>
        <sn-button v-tooltip="{ placement: 'left' }" variant="success">Left</sn-button>
        <sn-button v-tooltip="{ placement: 'left-end' }" variant="success">LeftEnd</sn-button>
        <sn-button v-tooltip="{ placement: 'right-start' }" variant="warning">RightStart</sn-button>
        <sn-button v-tooltip="{ placement: 'right' }" variant="warning">Right</sn-button>
        <sn-button v-tooltip="{ placement: 'right-end' }" variant="warning">RightEnd</sn-button>
        <sn-button v-tooltip variant="danger">默认</sn-button>
        <sn-button v-tooltip="{ trigger: 'click' }" variant="danger">Click</sn-button>
        <sn-button v-tooltip="{ trigger: 'contextmenu' }" variant="danger">ContextMenu</sn-button>
    </div>
</template>

<script setup lang="ts">
import { vTooltip } from '@shining-ui/directives'
</script>