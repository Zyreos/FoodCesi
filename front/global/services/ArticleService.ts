import Api from "./Api";

export default {
    getArticlesRestaurant(idRestaurant) {
        return Api().get(`articles/${idRestaurant}`)
    },
    newArticle(credentials: any) {
        return Api().post("create_article", credentials);
    },
};
