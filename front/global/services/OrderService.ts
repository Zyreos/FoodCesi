import Api from "./Api";

export default {
  newOrder(credentials: any) {
    return Api().post("newOrder", credentials);
  },
  getOrdersUser(idUser) {
    return Api().get(`orders/${idUser}`)
  },
};
