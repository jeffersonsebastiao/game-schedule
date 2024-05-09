export interface IGames {
  id: number;
  name: string;
  genderId: number;
  typeId: number;
  note: number;
  difficulty: number;
  finalized: boolean;
  timeFinalized: number;
  finalizeSoon: boolean;
  finalizeCondition: string;
}
