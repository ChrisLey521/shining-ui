<template>
    <input-wrapper :size :disabled>
        <slot name="prepend" />
        <template v-for="(tag, i) in displayedTags" :key="i">
            <slot :value="tag" name="tag">
                <Tag
                    :draggable
                    :variant
                    :size="innerSize"
                    :closable="!disabled && !readonly"
                    relative
                    z-1
                    @close="handleRemove(i)"
                    @dragstart="handleDrag($event, i)"
                    @dragover.prevent
                    @drop="handleDrop($event, i)"
                >
                    {{ tag }}
                </Tag>
            </slot>
        </template>
        <Overlay v-if="restTags.length" :trigger="triggerMore">
            <template #reference>
                <Button
                    :variant
                    :size="innerSize"
                    circle
                >
                    +{{ restTags.length }}
                </Button>
            </template>
            <ul flex flex-col gap-2 p-2>
                <li v-for="(tag, i) in restTags" :key="i">
                    <slot :value="tag" name="tag">
                        <Tag
                            :draggable
                            :variant
                            size="small"
                            :closable="!disabled && !readonly"
                            @close="handleRemove(maxDisplayedCount + i)"
                            @dragstart="handleDrag($event, maxDisplayedCount + i)"
                            @dragover.prevent
                            @drop="handleDrop($event, maxDisplayedCount + i)"
                        >
                            {{ tag }}
                        </Tag>
                    </slot>
                </li>
            </ul>
        </Overlay>
        <input
            v-model="inputValue"
            flex-1
            w-full
            b-0
            :maxlength="inputMaxlength"
            :minlength
            :tabindex
            :disabled
            :readonly
            :autofocus
            :aria-label
            caret-blue-5
            @keydown.enter="triggerKey === 'enter' && handleTrigger()"
            @keydown.space="triggerKey === 'space' && handleTrigger()"
            @keydown.backspace="handleBackspace"
        />
        <Button
            v-if="clearable"
            class="!hidden !group-hover:inline"
            :size="innerSize"
            ghost
            circle
            icon="circle-close"
            @click="handleClear"
        />
        <slot name="append" />
    </input-wrapper>
</template>

<script setup lang="ts">
import { DEFAULT_SIZE, DEFAULT_VARIANT, Size } from 'constants/common';
import { isEmpty } from 'lodash-unified';
import { computed, ref } from 'vue';
import { Button } from '../../button';
import { InputWrapper } from '../../input';
import { Overlay } from '../../overlay';
import { Tag } from '../../tag';
import { TagInputProps } from './type';

const {
    disabled,
    max,
    maxDisplayedCount,
    triggerMore = 'hover',
    maxlength,
    variant = DEFAULT_VARIANT,
    size = DEFAULT_SIZE,
    triggerKey = 'enter'
} = defineProps<TagInputProps>()

const innerSize = computed(() => {
    const size2TagSize = new Map<`${Size}`, `${Size}`>([
        [Size.Large, Size.Medium],
        [Size.Medium, Size.Small],
        [Size.Small, Size.Mini]
    ])
    return size2TagSize.get(size)
})

const value = defineModel<string[]>({ default: [] })

const displayedTags = computed(() => value.value.slice(0, maxDisplayedCount))

const restTags = computed(() => typeof maxDisplayedCount === 'number'
    ? value.value.slice(maxDisplayedCount)
    : []
)

const inputMaxlength = computed(() => typeof max === 'number' && value.value.length === max
    ? 0
    : maxlength
)

const inputValue = ref('')

const handleTrigger = () => {
    if (isEmpty(inputValue.value)) return
    // if (!validate(inputValue.value)) return
    value.value = [...value.value, inputValue.value]
    inputValue.value = ''
}

const handleRemove = (index: number) => {
    value.value = [
        ...value.value.slice(0, index),
        ...value.value.slice(index + 1)
    ]
}

const handleBackspace = () => {
    if (inputValue.value.length) return
    const { length } = value.value
    value.value = value.value.slice(0, length - 1)
}

const handleClear = () => {
    value.value = []
    inputValue.value = ''
}

const dataTransferFormat = 'index'

const handleDrag = (e: DragEvent, index: number) => {
    e.dataTransfer.setData(dataTransferFormat, `${index}`)
}

const handleDrop = (e: DragEvent, index: number) => {
    const draggedTagIndex = parseInt(e.dataTransfer.getData(dataTransferFormat))
    if (draggedTagIndex === index) return

    const draggedTag = value.value[draggedTagIndex]
    const newValue = [...value.value]

    if (draggedTagIndex > index) {
        newValue.splice(draggedTagIndex, 1)
        newValue.splice(index, 0, draggedTag)
    } else {
        newValue.splice(index + 1, 0, draggedTag)
        newValue.splice(draggedTagIndex, 1)
    }
    
    value.value = newValue
}
</script>