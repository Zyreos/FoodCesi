import Api from "./Api";

export default {
  newOrder(credentials: any) {
    return Api().post("newOrder", credentials);
  },
};
