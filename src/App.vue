<script setup lang="ts">
import { invoke } from "@tauri-apps/api/tauri";

const a = () => {
  invoke("my_custom_command");
};
</script>

<template>
  <button @click="() => a()"></button>
</template>
