
<template>
    <div
        flex
        items-center
        gap-5
    >
        <sn-button icon="filter" />
        <sn-button variant="primary" icon="search">搜索</sn-button>
        <sn-button variant="danger" icon="trash" />
        <sn-button
            variant="success"
            size="mini"
            circle
        >
            <Icon name="check" />
        </sn-button>
    </div>
</template>

<script setup lang="ts">
import { Icon } from 'components'
</script>