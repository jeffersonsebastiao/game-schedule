<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { database } from "../api";
import { games, typeGame, console, powerOff } from "../assets";

const router = useRouter();
const position = ref("bottom");
const items = ref([
  {
    label: "Main",
    icon: games,
    command: async () => {
      router.push({ path: "/main" });
    },
  },
  {
    label: "Types",
    icon: typeGame,
    command: async () => {
      router.push({ path: "/type" });
    },
  },
  {
    label: "Consoles",
    icon: console,
    command: async () => {
      router.push({ path: "/console" });
    },
  },
  {
    label: "Sair",
    icon: powerOff,
    command: async () => {
      await database.close();
      router.push({ path: "/" });
    },
  },
]);

const onDockItemClick = (event: any, item: any) => {
  if (item.command) {
    item.command();
  }

  event.preventDefault();
};
</script>

<template>
  <router-view />
  <PvDock :model="items" :position="position" class="fixed">
    <template #icon="{ item }">
      <a
        @click="onDockItemClick($event, item)"
        class="bg-gray-100 border-circle text-black-alpha-90 cursor-pointer"
      >
        <img :src="item.icon" width="57" height="57" />
      </a>
    </template>
  </PvDock>
</template>
