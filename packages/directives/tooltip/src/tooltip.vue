<template>
    <div
        :class="bg"
        text-white
        rounded-md
        p-1
    >
        {{ content }}
        <div
            :class="bg"
            absolute
            w-8px
            h-8px
            transform-rotate-45
        />
    </div>
</template>

<script setup lang=ts>
defineProps<{
    content: string
}>()

const bg = 'bg-dark-5'
</script>