import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    clientId: "",
    clientName: "",
    imgUrl: "",
  }),
  actions: {
    setClientInfo(client: { id: string; name: string; imgUrl: string }) {
      this.clientId = client.id;
      this.clientName = client.name;
      this.imgUrl = client.imgUrl;
    },
  },
});
