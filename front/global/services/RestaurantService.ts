import Api from "./Api";

export default {
    getRestaurant(idRestaurant) {
        return Api().get(`restaurants/${idRestaurant}`)
    },
    getAllRestaurants() {
        return Api().get("restaurants")
    },
    getRestaurantsByCategory(category) {
        return Api().get("restaurants/category/"+ category)
    },
    getAllCategories() {
        return Api().get("categories")
    },
};
