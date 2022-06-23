import Api from "./Api";

export default {
    getRestaurant(idRestaurant) {
        return Api().get(`restaurants/${idRestaurant}`)
    },
    getAllRestaurants() {
        return Api().get("restaurants")
    },
};
