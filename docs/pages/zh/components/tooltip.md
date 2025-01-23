# Tooltip 

<exhibition-card >
<template #exhibition>
  <div class="grid gap-4 p-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-7"> 
  <div class="flex justify-center items-center col-span-full">
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Top Left prompts info Top Left prompts infoTop Left prompts info Top Left prompts infoTop Left prompts info Top Left prompts infoTop Left prompts info Top Left prompts infoTop Left prompts info Top Left prompts infoTop Left prompts info Top Left prompts infoTop Left prompts info Top Left prompts info Top Left prompts info Top Left prompts info <br> Top Left prompts info"
      placement="top-start"
    >
      <sn-button>top-start</sn-button>
    </sn-tooltip>
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Top Center prompts info <br> Top Center prompts info "
      placement="top"
    >
      <sn-button>top</sn-button>
    </sn-tooltip>
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Top Right prompts info <br> Top Right prompts info "
      placement="top-end"
    >
      <sn-button>top-end</sn-button>
    </sn-tooltip>
  </div>
 
  <div class="flex justify-between items-center col-span-full">
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Left Top prompts info <br> Left Top prompts info"
      placement="left-start"
    >
      <sn-button>left-start</sn-button>
    </sn-tooltip>
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Right Top prompts info <br> Right Top prompts info"
      placement="right-start"
    >
      <sn-button>right-start</sn-button>
    </sn-tooltip>
  </div>
 
  <div class="flex justify-between items-center col-span-full">
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Left Center prompts info <br> Left Center prompts info"
      placement="left"
    >
      <sn-button>left</sn-button>
    </sn-tooltip>
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Right Center prompts info <br> Right Center prompts info"
      placement="right"
    >
      <sn-button>right</sn-button>
    </sn-tooltip>
  </div>
 
  <div class="flex justify-between items-center col-span-full">
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Left Bottom prompts info <br> Left Bottom prompts info"
      placement="left-end"
    >
      <sn-button>left-end</sn-button>
    </sn-tooltip>
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Right Bottom prompts info <br> Right Bottom prompts info"
      placement="right-end"
    >
      <sn-button>right-end</sn-button>
    </sn-tooltip>
  </div>
 
  <div class="flex justify-center items-center col-span-full">
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Bottom Left prompts info <br> Bottom Left prompts info"
      placement="bottom-start"
    >
      <sn-button>bottom-start</sn-button>
    </sn-tooltip>
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Bottom Center prompts info <br> Bottom Center prompts info"
      placement="bottom"
    >
      <sn-button>bottom</sn-button>
    </sn-tooltip>
    <sn-tooltip
      class="m-2"
      theme="dark"
      content="Bottom Right prompts info <br> Bottom Right prompts info"
      placement="bottom-end"
    >
      <sn-button>bottom-end</sn-button>
    </sn-tooltip>
  </div>
</div>
</template>
</exhibition-card>
 

<exhibition-card class="mt-20">
<template #exhibition>
  <div class="grid gap-4 p-4 grid-cols-3 md:grid-cols-5 lg:grid-cols-7"> 
  <div class="flex justify-center items-center col-span-full">
  <sn-tooltip
    content="<span>The content can be <strong>HTML</strong></span>"
    raw-content
  >
    <sn-button>hover me</sn-button>
  </sn-tooltip>
  
  <sn-tooltip placement="top">
    <template #content> multiple lines<br />second line </template>
    <sn-button>Top center</sn-button>
  </sn-tooltip>
  </div>
  </div>
</template>
</exhibition-card>