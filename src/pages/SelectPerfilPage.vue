<script setup lang="ts">
import { invoke } from "@tauri-apps/api";
import { onBeforeMount, ref } from "vue";

const loadSavesFolder = async () => {
  const savesList = await invoke<string[]>("list_all_saves");
  saves.value = savesList.map((value) => ({ name: value }));
};

onBeforeMount(async () => {
  await loadSavesFolder();
});

const reloadSavesFolder = async () => {
  await loadSavesFolder();
};

const saves = ref<{ name: string }[]>();
</script>
<template>
  <div class="flex justify-content-center mt-6">
    <div class="w-6 gap-3 flex flex-column">
      <div class="flex w-full gap-3">
        <PvInputText class="flex-1" />
        <PvButton label="Novo Perfil" />
        <PvButton icon="pi pi-undo" @click="() => reloadSavesFolder()" />
      </div>
      <PvDataTable :value="saves" paginator :rows="5" class="w-full">
        <PvColumn field="name" header="Nome" style="width: 90%" />
        <PvColumn>
          <template #body="slotProps">
            <PvButton icon="pi pi-times" />
          </template>
        </PvColumn>
      </PvDataTable>
    </div>
  </div>
</template>
