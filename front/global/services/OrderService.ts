import Api from "./Api";

export default {
  newOrder(credentials: any) {
    return Api().post("newOrder", credentials);
  },
  getOrdersUser(idUser) {
    return Api().get(`orders/${idUser}`);
  },
  getOrdersDelivering() {
    return Api().get("orders_delivering");
  },
  confirmDelivererOrder(idOrder, idUser, credentials: any) {
    return Api().put(`order_confirm_deliverer/${idOrder}/${idUser}`, credentials);
  },
  changeOrderState(idOrder, credentials: any) {
    return Api().put(`changeOrderState/${idOrder}`, credentials);
  }
};
