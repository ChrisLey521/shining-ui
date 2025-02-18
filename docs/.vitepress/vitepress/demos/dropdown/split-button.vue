<template>
    <div flex flex-grow gap-5>
        <sn-dropdown split-button variant="primary" @command="handleCmd">
            更多
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
        <sn-dropdown split-button variant="danger" @command="handleCmd">
            删除
            <template #dropdown >
                <dropdown-menu>
                    <dropdown-item command="1">
                        隐藏
                    </dropdown-item>
                    <dropdown-item command="2">
                        永久删除
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