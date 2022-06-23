import Api from "./Api";

export default {
    getArticlesRestaurant(idRestaurant) {
        return Api().get(`articles/${idRestaurant}`)
    },
};
