import Button from "primevue/button";
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";
import Column from "primevue/column";
import primeVueConfig from "primevue/config";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import InputText from "primevue/inputtext";
import Menu from "primevue/menu";
import OverlayPanel from "primevue/overlaypanel";
import Password from "primevue/password";
import Tag from "primevue/tag";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import { Plugin } from "vue";

export const primeVuePlugin: Plugin = {
  install(app) {
    app.use(primeVueConfig);
    app.use(ToastService);

    // From components
    app.component("PvInputText", InputText);
    app.component("PvInputSwitch", InputSwitch);
    app.component("PvInputNumber", InputNumber);
    app.component("PvPassword", Password);
    app.component("PvCheckbox", Checkbox);
    app.component("PvDropdown", Dropdown);

    // Button components
    app.component("PvButton", Button);

    // Overlay components
    app.component("PvDialog", Dialog);
    app.component("PvOverlayPanel", OverlayPanel);

    // Panel components
    app.component("PvCard", Card);

    // Menu components
    app.component("PvMenu", Menu);

    // Data components
    app.component("PvDataTable", DataTable);
    app.component("PvColumn", Column);

    // Message components
    app.component("PvToast", Toast);

    // Other
    app.component("PvTag", Tag);
  },
};
