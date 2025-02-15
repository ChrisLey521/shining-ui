<template>
    <div>
        <sn-dropdown @command="handleCmd">
            <sn-button variant="primary">更多</sn-button>
            <template #dropdown >
                <DropdownMenu>
                    <DropdownItem command="1">
                        菜单一
                    </DropdownItem>
                    <DropdownItem command="2">
                        菜单二
                    </DropdownItem>
                </DropdownMenu>
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