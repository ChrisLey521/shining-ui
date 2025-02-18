<template>
    <div>
        <div mb-5>
            <sn-button variant="success" @click="handleClickOpen">点我打开</sn-button>
        </div>
        <sn-dropdown ref="dropdown1" trigger="contextmenu">
            <sn-button variant="primary">更多1</sn-button>
            <template #dropdown >
                <dropdown-menu>
                    <dropdown-item command="1">
                        菜单一
                    </dropdown-item>
                    <dropdown-item command="2">
                        菜单二
                    </dropdown-item>
                </dropdown-menu>
            </template>
        </sn-dropdown>
        <sn-dropdown ref="dropdown2" class="ml-2" trigger="contextmenu">
            <sn-button variant="primary">更多2</sn-button>
            <template #dropdown >
                <dropdown-menu>
                    <dropdown-item command="1">
                        菜单一
                    </dropdown-item>
                    <dropdown-item command="2">
                        菜单二
                    </dropdown-item>
                </dropdown-menu>
            </template>
        </sn-dropdown>
    </div>
</template>

<script setup lang="ts">
import { DropdownItem, DropdownMenu, Dropdown as SnDropdown } from 'components';
import { useTemplateRef } from 'vue';

const dropdown1 = useTemplateRef('dropdown1')
const dropdown2 = useTemplateRef('dropdown2')
const handleClickOpen = () => {
    dropdown1.value?.open()
    dropdown2.value?.toggle()
}
</script>