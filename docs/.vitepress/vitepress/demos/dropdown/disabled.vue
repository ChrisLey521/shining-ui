<template>
    <div>
        <sn-dropdown @command="handleCmd">
            <sn-button variant="primary">更多</sn-button>
            <template #dropdown >
                <dropdown-menu>
                    <dropdown-item command="1">
                        菜单一
                    </dropdown-item>
                    <dropdown-item command="2" disabled>
                        菜单二
                    </dropdown-item>
                </dropdown-menu>
            </template>
        </sn-dropdown>
    </div>
</template>

<script setup lang="ts">
import { DropdownItem, DropdownMenu } from 'components';

const handleCmd = (cmd: string) => {
    console.log(cmd)
}
</script>