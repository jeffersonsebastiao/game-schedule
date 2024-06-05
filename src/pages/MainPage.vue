<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import {
  gamesRepository,
  typeRepository,
  genderRepository,
  IGames,
  IType,
  IGender,
} from "../api";

const gamesList = ref<IGames[]>([]);
const typeList = ref<IType[]>([]);
const genderList = ref<IGender[]>([]);

const loadContentPage = async () => {
  typeList.value = await typeRepository.getAll();
  genderList.value = await genderRepository.getAll();
  gamesList.value = await gamesRepository.getAll();
};

onBeforeMount(async () => {
  await loadContentPage();
});

interface INewGame extends Omit<IGames, "id" | "genderId" | "typeId"> {
  type: {
    id: number;
    name: string;
  };
  gender: {
    id: number;
    name: string;
  };
}

const newGame = ref<INewGame>({
  name: "",
  gender: {
    id: 0,
    name: "",
  },
  type: {
    id: 0,
    name: "",
  },
  note: 0,
  difficulty: 0,
  finalized: false,
  timeFinalized: 0,
  finalizeSoon: true,
  finalizeCondition: "",
});

const gameId = ref<number>(0);
const warningDeleteSaveMenu = ref(false);

const showWarningDeleteConsoleMenu = () => {
  warningDeleteSaveMenu.value = !warningDeleteSaveMenu.value;
};

const createGame = async () => {
  // Criar o caso de uso que impede de o jogo estar "finalize" e "finalizeSoon" ao mesmo tempo
  await gamesRepository.create({
    name: newGame.value.name,
    genderId: newGame.value.gender.id,
    typeId: newGame.value.type.id,
    note: newGame.value.note,
    difficulty: newGame.value.difficulty,
    finalized: newGame.value.finalized,
    timeFinalized: newGame.value.timeFinalized,
    finalizeSoon: newGame.value.finalizeSoon,
    finalizeCondition: newGame.value.finalizeCondition,
  });
  gamesList.value = await gamesRepository.getAll();
};

const deleteGame = async () => {
  await gamesRepository.delete({ id: gameId.value });
  gamesList.value = await gamesRepository.getAll();
  showWarningDeleteConsoleMenu();
};
</script>
<template>
  <div class="flex justify-content-center mt-6">
    <div class="w-6 gap-3 flex flex-column">
      <div class="flex w-full gap-3 flex-column">
        <PvInputText class="flex-1" v-model="newGame.name" placeholder="Nome" />
        <PvDropdown
          v-model="newGame.gender"
          :options="genderList"
          option-label="name"
          placeholder="Selecione um gênero"
        />
        <PvDropdown
          v-model="newGame.type"
          :options="typeList"
          option-label="name"
          placeholder="Selecione um tipo"
        />
        <PvInputNumber v-model="newGame.note" />
        <label>Nota</label>
        <PvInputNumber v-model="newGame.difficulty" />
        <label>Dificuldade</label>
        <PvCheckbox v-model="newGame.finalized" :binary="true" />
        <label>Terminado</label>
        <PvInputNumber v-model="newGame.timeFinalized" />
        <label>Tempo levado para terminar</label>
        <PvCheckbox v-model="newGame.finalizeSoon" :binary="true" />
        <label>Pretender terminar logo</label>
        <PvInputText
          v-model="newGame.finalizeCondition"
          placeholder="Condição para terminar"
        />

        <PvButton label="Novo Jogo" @click="() => createGame()" />
      </div>
      <PvDataTable :value="gamesList" class="w-full" size="small">
        <PvColumn field="name" header="Nome" />
        <PvColumn field="gender" header="Gênero" />
        <PvColumn field="type" header="Tipo" />
        <PvColumn field="note" header="Nota" />
        <PvColumn field="difficulty" header="Dificuldade" />
        <PvColumn field="finalized" header="Terminado" />
        <PvColumn field="time_finalized" header="Tempo" />
        <PvColumn field="finalize_soon" header="Pretendo terminar" />
        <PvColumn field="finalize_condition" header="Condição para terminar" />
        <PvColumn>
          <template #body="slotProps">
            <PvButton
              icon="pi pi-times"
              @click="
                () => {
                  gameId = slotProps.data.id;
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
      <span> Você realmente deseja deletar esse jogo? </span>
      <div class="gap-2 flex">
        <PvButton label="Sim" @click="() => deleteGame()" />
        <PvButton label="Não" @click="() => showWarningDeleteConsoleMenu()" />
      </div>
    </div>
  </PvDialog>
</template>
