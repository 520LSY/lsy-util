<template>
  <div class="router-list">
    <template v-for="(item, i) in headerList">
      <div class="router-item" v-if="i">
        <div class="router-item-key">{{ item.name }}:</div>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { headerList } from "@/components/Header/index";
</script>
