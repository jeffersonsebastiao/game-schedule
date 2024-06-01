<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { typeRepository, IType } from "../api";

const typeList = ref<IType[]>();
const loadTypeList = async () => {
  typeList.value = await typeRepository.getAll();
};

onBeforeMount(async () => {
  await loadTypeList();
});

const warningDeleteSaveMenu = ref(false);

const showWarningDeleteConsoleMenu = () => {
  warningDeleteSaveMenu.value = !warningDeleteSaveMenu.value;
};

const typeInfo = ref<IType>();

const newTypeName = ref<string>("");
const createNewType = async () => {
  await typeRepository.create({ name: newTypeName.value });
  await loadTypeList();
  newTypeName.value = "";
};

const deleteType = async () => {
  await typeRepository.delete({ id: typeInfo.value!.id });
  await loadTypeList();
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
        <PvInputText class="flex-1" v-model="newTypeName" />
        <PvButton label="Novo Tipo" @click="createNewType()" />
      </div>
      <PvDataTable :value="typeList" class="w-full">
        <PvColumn field="name" header="Nome" style="width: 90%" />
        <PvColumn>
          <template #body="slotProps">
            <PvButton
              icon="pi pi-times"
              @click="
                () => {
                  typeInfo = slotProps.data;
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
      <span> Você realmente deseja deletar esse tipo? </span>
      <div class="gap-2 flex">
        <PvButton label="Sim" @click="() => deleteType()" />
        <PvButton label="Não" @click="() => showWarningDeleteConsoleMenu()" />
      </div>
    </div>
  </PvDialog>
</template>
