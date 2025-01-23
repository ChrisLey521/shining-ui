<script setup lang="ts">
// import { useData } from 'vitepress'
import Theme from 'vitepress/theme';

const { Layout } = Theme
// https://vitepress.dev/reference/runtime-api#usedata
// const { site, frontmatter } = useData()
</script>

<template>
  <Layout />
  <!-- <div v-if="frontmatter.home">
    <h1>{{ site.title }}</h1>
    <p>{{ site.description }}</p>
    <ul>
      <li><a href="/markdown-examples.html">Markdown Examples</a></li>
      <li><a href="/api-examples.html">API Examples</a></li>
    </ul>
  </div>
  <div v-else>
    <a href="/">Home</a>
    <Content />
  </div> -->
</template>
