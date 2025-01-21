<template>
    <exhibition-card :columns="5">
        <sn-button>默认按钮</sn-button>
        <sn-button variant="primary">主要按钮</sn-button>
        <sn-button variant="success">成功按钮</sn-button>
        <sn-button variant="warning">警告按钮</sn-button>
        <sn-button variant="danger">危险按钮</sn-button>
        <sn-button>默认按钮</sn-button>
        <sn-button variant="primary">主要按钮</sn-button>
        <sn-button variant="success">成功按钮</sn-button>
        <sn-button variant="warning">警告按钮</sn-button>
        <sn-button variant="danger">危险按钮</sn-button>

        <template #code>
            <template>
                <sn-button>默认按钮</sn-button>
                <sn-button variant="primary">主要按钮</sn-button>
                <sn-button variant="success">成功按钮</sn-button>
                <sn-button variant="warning">警告按钮</sn-button>
                <sn-button variant="danger">危险按钮</sn-button>
            </template>
        </template>
    </exhibition-card>
</template>

<script setup>
import ExhibitionCard from '@common/exhibition-card.vue';
import { Button as SnButton } from 'components';
</script>