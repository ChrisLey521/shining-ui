<template>
    <div>
        <sn-dropdown split-button @command="handleCmd">
            更多
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