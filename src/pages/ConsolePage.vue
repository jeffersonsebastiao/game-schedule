<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { consoleRepository, IConsole } from "../api";

const consoleList = ref<IConsole[]>();
const loadConsoleList = async () => {
  consoleList.value = await consoleRepository.getAll();
};

onBeforeMount(async () => {
  await loadConsoleList();
});

const warningDeleteSaveMenu = ref(false);

const showWarningDeleteConsoleMenu = () => {
  warningDeleteSaveMenu.value = !warningDeleteSaveMenu.value;
};

const consoleInfo = ref<IConsole>();

const newConsoleName = ref<string>("");
const createNewConsole = async () => {
  await consoleRepository.create({ name: newConsoleName.value });
  await loadConsoleList();
  newConsoleName.value = "";
};

const deleteSave = async () => {
  await consoleRepository.delete({ id: consoleInfo.value!.id });
  await loadConsoleList();
  showWarningDeleteConsoleMenu();
};
const a = (a: any) => {
  console.log(a);
};
</script>
<template>
  <div class="flex justify-content-center mt-6">
    <div class="w-6 gap-3 flex flex-column">
      <div class="flex w-full gap-3">
        <PvInputText class="flex-1" v-model="newConsoleName" />
        <PvButton label="Novo Console" @click="createNewConsole()" />
      </div>
      <PvDataTable :value="consoleList" class="w-full">
        <PvColumn field="name" header="Nome" style="width: 90%" />
        <PvColumn>
          <template #body="slotProps">
            <PvButton
              icon="pi pi-times"
              @click="
                () => {
                  consoleInfo = slotProps.data;
                  showWarningDeleteConsoleMenu();
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
      <span> Você realmente deseja deletar esse console? </span>
      <div class="gap-2 flex">
        <PvButton label="Sim" @click="() => deleteSave()" />
        <PvButton label="Não" @click="() => showWarningDeleteConsoleMenu()" />
      </div>
    </div>
  </PvDialog>
</template>
