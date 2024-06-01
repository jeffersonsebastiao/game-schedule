<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { genderRepository, IGender } from "../api";

const genderList = ref<IGender[]>();
const loadGenderList = async () => {
  genderList.value = await genderRepository.getAll();
};

onBeforeMount(async () => {
  await loadGenderList();
});

const warningDeleteSaveMenu = ref(false);

const showWarningDeleteConsoleMenu = () => {
  warningDeleteSaveMenu.value = !warningDeleteSaveMenu.value;
};

const genderInfo = ref<IGender>();

const newGenderName = ref<string>("");
const createNewGender = async () => {
  await genderRepository.create({ name: newGenderName.value });
  await loadGenderList();
  newGenderName.value = "";
};

const deleteGender = async () => {
  await genderRepository.delete({ id: genderInfo.value!.id });
  await loadGenderList();
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
        <PvInputText class="flex-1" v-model="newGenderName" />
        <PvButton label="Novo Tipo" @click="createNewGender()" />
      </div>
      <PvDataTable :value="genderList" class="w-full">
        <PvColumn field="name" header="Nome" style="width: 90%" />
        <PvColumn>
          <template #body="slotProps">
            <PvButton
              icon="pi pi-times"
              @click="
                () => {
                  genderInfo = slotProps.data;
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
      <span> Você realmente deseja deletar esse gênero? </span>
      <div class="gap-2 flex">
        <PvButton label="Sim" @click="() => deleteGender()" />
        <PvButton label="Não" @click="() => showWarningDeleteConsoleMenu()" />
      </div>
    </div>
  </PvDialog>
</template>
