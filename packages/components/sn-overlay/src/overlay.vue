<template>
    <SingleChild
        v-if="$slots.reference"
        v-click-outside="handleClickOutside"
        ref="reference"
        @[showOverlayEvent]="showOverlay"
        @[hideOverlayEvent]="hideOverlay"
        @click="handleTriggerClick"
    >
        <slot name="reference" />
    </SingleChild>
    <Teleport :to="container">
        <div
            ref="floating"
            v-if="overlayVisible"
            :class="themeStyles"
            :style="{
                ...floatingStyles,
                width
            }"
            rounded-md
            b
            b-solid
            p-4
        >
            <h3 v-if="title" mb-2>{{ title }}</h3>
            <slot>
                {{ content }}
            </slot>
            <div
                v-if="showArrow"
                ref="floatingArrow"
                id="__popper-arrow"
                :class="[...themeStyles, ...arrowStyleAndClasses[1]]"
                :style="arrowStyleAndClasses[0]"
                absolute
                b
                b-solid
                w-8px
                h-8px
                transform-rotate-45
            />
        </div>
    </Teleport>
</template>

<script setup lang=ts>
import { arrow, autoUpdate, flip, offset, shift, useFloating } from '@floating-ui/vue';
import { vClickOutside } from '@shining-ui/directives';
import { Placement, Theme, Trigger } from 'constants';
import { computed, ref } from 'vue';
import SingleChild from '../../single-child/src/single-child.vue';
import { side } from './const';
import { OverlayProps, PlacementSide } from './type';

const {
    theme = Theme.Light,
    placement = Placement.TopStart,
    offset: popperOffset = 10,
    visible: initialVisible = false,
    trigger = Trigger.Hover,
    container = document.body,
    showArrow = true
} = defineProps<OverlayProps>()

const visible = defineModel<boolean>('visible')

const themeStyles = computed(() => {
    const bgMap = new Map<OverlayProps['theme'], string[]>([
        [Theme.Dark, ['bg-dark-5', 'text-white', 'b-gray-6']],
        [Theme.Light, ['bg-white', 'text-blue', 'b-gray-2']]
    ])

    return bgMap.get(theme)
})

const reference = ref(null);
const floating = ref(null);
const floatingArrow = ref(null)

const { floatingStyles, middlewareData, placement: computedPlacement } = useFloating(reference, floating, {
    placement,
    middleware: [offset(popperOffset), flip(), shift(), arrow({ element: floatingArrow })],
    whileElementsMounted: autoUpdate
});


// [style, classes]
const arrowStyleAndClasses= computed<[Record<PlacementSide, string>, string[]]>(() => {
    // 箭头位置
    const { x: arrowX = 0, y: arrowY = 0 } = middlewareData.value.arrow ?? {};

    const mainPlacement = computedPlacement.value.split('-')[0]

    const staticSide: PlacementSide = side[mainPlacement];

    const style = {
        left: arrowX ? `${arrowX}px` : '',
        top: arrowY ? `${arrowY}px` : '',
        right: '',
        bottom: '',
        [staticSide]: '-4px',
    }

    // 根据placement得到箭头不需要的边框
    const invisibleArrowBorder = {
        top: ['b-t-transparent', 'b-l-transparent'],
        bottom: ['b-b-transparent', 'b-r-transparent'],
        left: ['b-b-transparent', 'b-l-transparent'],
        right: ['b-t-transparent', 'b-r-transparent'],
    }

    return [style, invisibleArrowBorder[mainPlacement]]
})

const overlayVisible = ref(visible.value ?? initialVisible)

const showOverlayEvent = computed(() => {
    const showOverlayEventMap = new Map<Trigger, string>([
        [Trigger.Hover, 'mouseenter'],
        [Trigger.Focus, 'focus'],
        [Trigger.ContextMenu, 'contextmenu']
    ])

    return showOverlayEventMap.get(trigger)
})

const hideOverlayEvent = computed(() => {
    const showOverlayEventMap = new Map<Trigger, string>([
        [Trigger.Hover, 'mouseleave'],
        [Trigger.Focus, 'blur']
    ])

    return showOverlayEventMap.get(trigger) ?? void 0
})

const toggleOverlay = (shouldShowOverlay: boolean) => {
    // 优先级策略: v-model:visible > props.visible (受控) > overlayVisible

    // 没有 v-model:visible
    if (typeof visible.value === 'undefined') {
        // 传入了 props.visible , 则由 props.visible 决定，组件不能更改可见性
        if (typeof initialVisible !== 'undefined') return
        // 没有传入 props.visible 则由组件自己决定
        overlayVisible.value = shouldShowOverlay
        return
    }
    // 有 v-model:visible, 组件可更改可见性, 且v-model:visible也同样会更新值
    overlayVisible.value = shouldShowOverlay
    // v-model值变更时, 会自动 emits update:visible ?
    visible.value = shouldShowOverlay
}

const showOverlay = (e: MouseEvent) => {
    e.preventDefault()
    toggleOverlay(true)
}

const hideOverlay = () => {
    toggleOverlay(false)
}

const handleClickOutside = () => {
    console.log('click-outside')
    if (trigger !== Trigger.Click && trigger !== Trigger.ContextMenu) return
    toggleOverlay(false)
}

const handleTriggerClick = () => {
    if (trigger !== Trigger.Click) return
    const shouldShowOverlay = !overlayVisible.value
    toggleOverlay(shouldShowOverlay)
}

</script>