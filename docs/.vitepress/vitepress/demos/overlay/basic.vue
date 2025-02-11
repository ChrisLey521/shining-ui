
<template>
    <div
        grid
        grid-cols-2
        sm:grid-cols-5
        gap-2
    >
        <sn-overlay
            title="Trigger Click"
            trigger="click">
            这是overlay
            <template #reference>
                <sn-button>Click</sn-button>
            </template>
        </sn-overlay>
        <sn-overlay
            title="Trigger Click"
            trigger="click"
            placement="top">
            这是overlay
            <template #reference>
                <sn-button>Click</sn-button>
            </template>
        </sn-overlay>
        <sn-overlay
            title="Trigger Click"
            placement="top-end"
            trigger="click">
            这是overlay
            <template #reference>
                <sn-button>Click</sn-button>
            </template>
        </sn-overlay>
        <sn-overlay
            title="Trigger Hover"
            trigger="hover"
            placement="bottom-start">
            这是overlay
            <template #reference>
                <sn-button>Hover</sn-button>
            </template>
        </sn-overlay>
        <sn-overlay
            title="Trigger Focus"
            placement="bottom"
            trigger="hover">
            这是overlay
            <template #reference>
                <sn-button>Hover</sn-button>
            </template>
        </sn-overlay>
        <sn-overlay
            title="Trigger ContextMenu"
            placement="bottom-end"
            trigger="contextmenu">
            这是overlay
            <template #reference>
                ContextMenu
            </template>
        </sn-overlay>        <sn-overlay
            title="Trigger Click"
            placement="left-start"
            trigger="click">
            这是overlay
            <template #reference>
                <sn-button>Click</sn-button>
            </template>
        </sn-overlay>
        <sn-overlay
            title="Trigger Click"
            trigger="click"
            placement="left">
            这是overlay
            <template #reference>
                <sn-button>Click</sn-button>
            </template>
        </sn-overlay>
        <sn-overlay
            title="Trigger Click"
            placement="left-end"
            trigger="click">
            这是overlay
            <template #reference>
                <sn-button>Click</sn-button>
            </template>
        </sn-overlay>
        <sn-overlay
            title="Trigger Hover"
            trigger="hover"
            placement="right-start">
            这是overlay
            <template #reference>
                <sn-button>Hover</sn-button>
            </template>
        </sn-overlay>
        <sn-overlay
            title="Trigger Focus"
            placement="right"
            trigger="hover">
            这是overlay
            <template #reference>
                <sn-button>Hover</sn-button>
            </template>
        </sn-overlay>
        <sn-overlay
            title="Trigger ContextMenu"
            placement="right-end"
            trigger="contextmenu">
            这是overlay
            <template #reference>
                ContextMenu
            </template>
        </sn-overlay>
    </div>
</template>