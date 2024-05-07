<script setup lang="ts">
import {
  readDir,
  createDir,
  exists,
  BaseDirectory,
  removeFile,
  FileEntry,
} from "@tauri-apps/api/fs";
import { onBeforeMount, ref } from "vue";
import { database } from "../api";

const loadSavesFolder = async () => {
  const savesList = await readDir("game_schedule", {
    dir: BaseDirectory.Document,
  });
  saves.value = savesList.filter((item) => item);
};

onBeforeMount(async () => {
  if (!(await exists("game_schedule", { dir: BaseDirectory.Document }))) {
    await createDir("game_schedule", { dir: BaseDirectory.Document });
  }

  await loadSavesFolder();
});

const deleteSave = async (file: string) => {
  await removeFile(`game_schedule\\${file}`, { dir: BaseDirectory.Document });
  await loadSavesFolder();
  warningDeleteSaveMenu.value = !warningDeleteSaveMenu.value;
};

const warningDeleteSaveMenu = ref(false);

const showWarningDeleteSaveMenu = () => {
  warningDeleteSaveMenu.value = !warningDeleteSaveMenu.value;
};

const saveName = ref<string>("");

const saves = ref<FileEntry[]>();

const newFileName = ref<string>("");
const createNewFile = async () => {
  if (newFileName.value) {
    await database.createNewFile(newFileName.value);
  }
};
</script>
<template>
  <div class="flex justify-content-center mt-6">
    <div class="w-6 gap-3 flex flex-column">
      <div class="flex w-full gap-3">
        <PvInputText class="flex-1" />
        <PvButton label="Novo Perfil" @click="createNewFile()" />
        <PvButton icon="pi pi-undo" @click="() => loadSavesFolder()" />
      </div>
      <PvDataTable :value="saves" paginator :rows="5" class="w-full">
        <PvColumn field="name" header="Nome" style="width: 90%" />
        <PvColumn>
          <template #body="slotProps">
            <PvButton
              icon="pi pi-times"
              @click="
                () => {
                  saveName = slotProps.data.name;
                  showWarningDeleteSaveMenu();
                }
              "
            />
          </template>
        </PvColumn>
      </PvDataTable>
    </div>
  </div>
  <PvDialog v-model:visible="warningDeleteSaveMenu" modal header="Atenção!">
    <div class="flex flex-column gap-3 align-items-end">
      <span> Você realmente deseja deletar esse perfil? </span>
      <div class="gap-2 flex">
        <PvButton label="Sim" @click="() => deleteSave(saveName)" />
        <PvButton label="Não" @click="() => showWarningDeleteSaveMenu()" />
      </div>
    </div>
  </PvDialog>
</template>
